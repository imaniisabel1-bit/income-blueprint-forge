
-- Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "Public can subscribe with valid email" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can insert calculation logs with data" ON public.calculation_logs;

-- Require authenticated users for newsletter signups
CREATE POLICY "Authenticated users can subscribe with valid email"
ON public.newsletter_subscribers
FOR INSERT
TO authenticated
WITH CHECK ((email IS NOT NULL) AND (length(TRIM(BOTH FROM email)) > 5));

-- Require authenticated users for calculation logs
CREATE POLICY "Authenticated users can insert calculation logs"
ON public.calculation_logs
FOR INSERT
TO authenticated
WITH CHECK ((input_pages IS NOT NULL) AND (input_price IS NOT NULL));
