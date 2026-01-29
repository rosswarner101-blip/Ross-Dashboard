-- Drop existing tables to reset schema if needed (Optional, but ensures clean state)
DROP TABLE IF EXISTS authorized_masters;
DROP TABLE IF EXISTS authorized_managers;
DROP TABLE IF EXISTS authorized_recruiters;

-- Create table for Authorized Masters
CREATE TABLE authorized_masters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Authorized Managers
CREATE TABLE authorized_managers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Authorized Recruiters
CREATE TABLE authorized_recruiters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE authorized_masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_recruiters ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Custom Auth Policy
-- Since we are NOT using Supabase Auth (users are not logged in via Supabase),
-- we must allow the 'anon' (public) role to SELECT from these tables to verify credentials.

CREATE POLICY "Allow public read access" ON authorized_masters FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON authorized_managers FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON authorized_recruiters FOR SELECT TO anon USING (true);

-- Note: You should NOT enable public INSERT/UPDATE/DELETE. Only SELECT.
