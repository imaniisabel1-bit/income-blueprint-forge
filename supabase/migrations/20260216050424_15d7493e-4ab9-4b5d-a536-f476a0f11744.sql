
-- Create centralized Founding Architect Leads table
CREATE TABLE public.founding_architect_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'vault_form',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint on email
ALTER TABLE public.founding_architect_leads ADD CONSTRAINT founding_architect_leads_email_key UNIQUE (email);

-- Enable RLS
ALTER TABLE public.founding_architect_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a lead"
  ON public.founding_architect_leads
  FOR INSERT
  WITH CHECK (true);

-- Only admins can read leads
CREATE POLICY "Admins can view leads"
  ON public.founding_architect_leads
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
