
-- Drop overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can insert calculation logs" ON public.calculation_logs;

-- Add tighter INSERT policy for newsletter_subscribers (require non-empty email)
CREATE POLICY "Public can subscribe with valid email"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  email IS NOT NULL AND length(trim(email)) > 5
);

-- Add tighter INSERT policy for calculation_logs (require at least one input field)
CREATE POLICY "Public can insert calculation logs with data"
ON public.calculation_logs
FOR INSERT
WITH CHECK (
  input_pages IS NOT NULL AND input_price IS NOT NULL
);
