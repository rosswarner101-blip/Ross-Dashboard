import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth/mammoth.browser';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const parseResume = async (file) => {
    try {
        let text = '';

        if (file.type === 'application/pdf') {
            text = await extractTextFromPdf(file);
        } else if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')
        ) {
            text = await extractTextFromDocx(file);
        } else if (file.type.startsWith('image/')) {
            return await analyzeImageWithGroq(file);
        } else {
            throw new Error('Unsupported file type. Please upload PDF, DOCX, or Image.');
        }

        if (!text.trim()) {
            throw new Error('Could not extract text from file.');
        }

        console.log("Extracted Text:", text.substring(0, 100) + "...");
        return await analyzeWithGroq(text);

    } catch (error) {
        console.error('Resume parsing error:', error);
        throw error;
    }
};

const extractTextFromPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Simple join with safe spacing
        const pageText = textContent.items.map((item) => item.str + (item.hasEOL ? '\n' : ' ')).join('');
        fullText += pageText + '\n\n';
    }
    return fullText;
};

const extractTextFromDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
};

const analyzeWithGroq = async (text) => {
    const prompt = `
    You are an expert HR assistant. Your task is to extract candidate details from the provided RESUME TEXT.
    
    INSTRUCTIONS:
    1. Read the text carefully row by row.
    2. Extract the exact information. Do not hallucinate.
    3. Return ONLY a valid JSON object.
    
    FIELDS TO EXTRACT:
    {
      "name": "Full Name",
      "appliedDesignation": "Likely Job Role or Title",
      "age": "Age (number, exclude 'years' etc, null if missing)",
      "totalExperience": "Total experience in years (number, e.g. 5.5)",
      "relevantExperience": "Relevant experience in years (number, e.g. 5.5. Use Total if not specified)",
      "currentOrg": "Current or Most Recent Company",
      "currentDesignation": "Current or Most Recent Job Title",
      "duration": "Duration at current company",
      "reasonForLeaving": "Reason for leaving (if mentioned)",
      "prevOrg": "Previous Company Name",
      "prevDesignation": "Previous Job Title",
      "prevDuration": "Duration at previous company",
      "qualification": "Highest Qualification",
      "graduation": "Graduation Degree",
      "reportingTo": "Reporting Manager Title (if mentioned)",
      "directReportees": "Number of reportees (number)",
      "maritalStatus": "Single/Married (infer from context)",
      "currentLocation": "Current City/Location",
      "currentSalary": "Current CTC",
      "expectedSalary": "Expected CTC",
      "noticePeriod": "Notice Period",
      "medicalIssues": "Medical issues",
      "relocation": boolean,
      "passport": "Passport status"
    }

    RESUME TEXT:
    ${text.substring(0, 20000)}
  `;

    try {
        console.log("Sending request to Groq API...");
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful HR assistant that extracts structured data from resumes. You strictly output JSON." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            let errorMsg = response.statusText;
            try {
                const errData = await response.json();
                errorMsg = errData.error?.message || JSON.stringify(errData);
            } catch (e) { }
            throw new Error(`Groq API Error (${response.status}): ${errorMsg}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        return JSON.parse(content);

    } catch (error) {
        console.error("AI Analysis failed:", error);
        throw error;
    }
};

const analyzeImageWithGroq = async (file) => {
    // Convert file to base64
    const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const prompt = `
        Analyze this resume image row by row. Extract the candidate details into a JSON object with standard keys.
        Return ONLY valid JSON.
    `;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.2-11b-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`
                                }
                            }
                        ]
                    }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            let errorMsg = response.statusText;
            try {
                const errData = await response.json();
                errorMsg = errData.error?.message || JSON.stringify(errData);
            } catch (e) { }
            throw new Error(`Groq Vision API Error (${response.status}): ${errorMsg}`);
        }

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);

    } catch (error) {
        console.error("Vision Analysis failed:", error);
        throw error;
    }
}
