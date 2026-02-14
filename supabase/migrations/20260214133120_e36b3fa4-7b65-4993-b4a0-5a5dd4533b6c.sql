
-- Admin role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: only admins can read roles
CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- TradingView invite management table
CREATE TABLE public.tv_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tv_username TEXT NOT NULL,
  client_email TEXT,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  granted_by UUID REFERENCES auth.users(id) NOT NULL
);
ALTER TABLE public.tv_invites ENABLE ROW LEVEL SECURITY;

-- Only admins can CRUD invites
CREATE POLICY "Admins can view invites"
  ON public.tv_invites FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert invites"
  ON public.tv_invites FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update invites"
  ON public.tv_invites FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete invites"
  ON public.tv_invites FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trade optimization logs (for AI analysis)
CREATE TABLE public.optimization_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  raw_data TEXT NOT NULL,
  ai_recommendation TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL
);
ALTER TABLE public.optimization_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage optimization logs"
  ON public.optimization_logs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
