-- Create donors table
CREATE TABLE public.donors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  name VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  age INT NOT NULL,
  city VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blood requests table
CREATE TABLE public.requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  requester_name VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  units_required INT NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

-- Create policies for donors table
CREATE POLICY "Users can view all donors"
ON public.donors
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own donor records"
ON public.donors
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donor records"
ON public.donors
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own donor records"
ON public.donors
FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for requests table
CREATE POLICY "Users can view all requests"
ON public.requests
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own requests"
ON public.requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests"
ON public.requests
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own requests"
ON public.requests
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_donors_updated_at
BEFORE UPDATE ON public.donors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_requests_updated_at
BEFORE UPDATE ON public.requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();