
-- Create trade_logs table for user trade journal
CREATE TABLE public.trade_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  ticker TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('long', 'short')),
  entry_price NUMERIC NOT NULL,
  exit_price NUMERIC,
  quantity INTEGER NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'canceled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  closed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.trade_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own trades
CREATE POLICY "Users can view own trades"
ON public.trade_logs FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own trades
CREATE POLICY "Users can insert own trades"
ON public.trade_logs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own trades
CREATE POLICY "Users can update own trades"
ON public.trade_logs FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own trades
CREATE POLICY "Users can delete own trades"
ON public.trade_logs FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
