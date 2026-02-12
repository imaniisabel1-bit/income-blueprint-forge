
-- 1. Create a table for System Kits
CREATE TABLE public.income_kits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  niche text,
  base_pages int,
  target_price decimal,
  is_active boolean DEFAULT true
);

-- 2. Enable RLS (public read, no write from client)
ALTER TABLE public.income_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active kits"
  ON public.income_kits FOR SELECT
  USING (is_active = true);

-- 3. Insert Sample Data
INSERT INTO public.income_kits (name, niche, base_pages, target_price)
VALUES 
('The Daily Gratitude', 'Women 25-45', 120, 12.99),
('Veteran Transition Log', 'Veterans', 150, 15.95),
('Nurse Shift Tracker', 'Healthcare', 100, 9.99),
('Student Budget Planner', 'College', 80, 8.95),
('Ladies Lounge Planner', 'Creative Founders', 200, 19.99);

-- 4. Create calculation_logs table
CREATE TABLE public.calculation_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  input_price decimal,
  input_pages int,
  result_profit decimal
);

ALTER TABLE public.calculation_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for logging calculations
CREATE POLICY "Anyone can insert calculation logs"
  ON public.calculation_logs FOR INSERT
  WITH CHECK (true);
