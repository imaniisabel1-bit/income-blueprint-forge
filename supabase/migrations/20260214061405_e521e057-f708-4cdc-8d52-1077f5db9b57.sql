
CREATE POLICY "No public read access to newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (false);
