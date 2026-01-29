-- Create table for Authorized Masters
CREATE TABLE IF NOT EXISTS authorized_masters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Added password column
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Authorized Managers
CREATE TABLE IF NOT EXISTS authorized_managers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Added password column
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Authorized Recruiters
CREATE TABLE IF NOT EXISTS authorized_recruiters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Added password column
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE authorized_masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_recruiters ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access to authenticated users
CREATE POLICY "Enable read access for all users" ON authorized_masters FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON authorized_managers FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON authorized_recruiters FOR SELECT USING (true);
