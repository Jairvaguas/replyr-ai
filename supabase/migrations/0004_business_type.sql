ALTER TABLE public.locations 
ADD COLUMN IF NOT EXISTS business_type text DEFAULT 'negocio local';