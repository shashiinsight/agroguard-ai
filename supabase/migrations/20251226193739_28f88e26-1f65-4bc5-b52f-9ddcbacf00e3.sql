-- Create enum for pesticide categories
CREATE TYPE public.pesticide_category AS ENUM ('Insecticide', 'Herbicide', 'Fungicide', 'Rodenticide', 'Bactericide');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create pesticides table
CREATE TABLE public.pesticides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category pesticide_category NOT NULL,
  used_for TEXT[] NOT NULL DEFAULT '{}',
  hazards TEXT NOT NULL,
  precautions TEXT NOT NULL,
  active_ingredient VARCHAR(200) NOT NULL,
  application_method VARCHAR(200) NOT NULL,
  safety_interval VARCHAR(100) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_logs table for tracking AI usage
CREATE TABLE public.ai_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.pesticides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updating timestamps
CREATE TRIGGER update_pesticides_updated_at
  BEFORE UPDATE ON public.pesticides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for pesticides (public read, admin write)
CREATE POLICY "Anyone can view pesticides"
  ON public.pesticides
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert pesticides"
  ON public.pesticides
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update pesticides"
  ON public.pesticides
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete pesticides"
  ON public.pesticides
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for user_roles (read own, admin can manage)
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for contact_messages
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_logs (public insert, admin read)
CREATE POLICY "Anyone can create ai logs"
  ON public.ai_logs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view ai logs"
  ON public.ai_logs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert sample pesticides data
INSERT INTO public.pesticides (name, category, used_for, hazards, precautions, active_ingredient, application_method, safety_interval) VALUES
('Chlorpyrifos', 'Insecticide', ARRAY['Cotton', 'Rice', 'Wheat', 'Vegetables'], 'Moderately toxic to humans. May cause nausea, dizziness, and confusion. Highly toxic to aquatic organisms and bees.', 'Wear protective clothing, gloves, and mask during application. Avoid contact with skin and eyes. Keep away from water bodies. Do not apply near flowering plants.', 'Chlorpyrifos 20% EC', 'Foliar spray', '14 days before harvest'),
('Glyphosate', 'Herbicide', ARRAY['Orchards', 'Plantation crops', 'Non-crop areas'], 'Low toxicity to humans but may cause eye and skin irritation. Controversial long-term health effects. Toxic to some aquatic plants.', 'Avoid spray drift to non-target crops. Use protective equipment. Do not apply near water sources. Wait until weeds are actively growing for best results.', 'Glyphosate 41% SL', 'Directed spray', '7 days'),
('Mancozeb', 'Fungicide', ARRAY['Tomatoes', 'Potatoes', 'Grapes', 'Citrus'], 'May cause skin sensitization. Potential thyroid effects with prolonged exposure. Eye and respiratory irritant.', 'Wear mask and goggles during mixing and application. Wash hands thoroughly after handling. Store in cool, dry place away from food.', 'Mancozeb 75% WP', 'Foliar spray', '21 days before harvest'),
('Imidacloprid', 'Insecticide', ARRAY['Rice', 'Cotton', 'Sugarcane', 'Vegetables'], 'Low mammalian toxicity but highly toxic to bees and other pollinators. May contaminate groundwater.', 'Do not apply during flowering. Avoid application when bees are foraging. Use seed treatment method when possible. Follow integrated pest management.', 'Imidacloprid 17.8% SL', 'Seed treatment / Foliar spray', '30 days'),
('Carbendazim', 'Fungicide', ARRAY['Cereals', 'Fruits', 'Vegetables', 'Ornamentals'], 'Potential reproductive toxicity. May cause skin and eye irritation. Suspected carcinogen in some studies.', 'Use appropriate PPE. Avoid prolonged exposure. Do not mix with acidic pesticides. Rotate with different fungicide groups to prevent resistance.', 'Carbendazim 50% WP', 'Foliar spray / Seed treatment', '14 days'),
('Cypermethrin', 'Insecticide', ARRAY['Cotton', 'Vegetables', 'Fruits', 'Stored grains'], 'Neurotoxic in high doses. May cause skin tingling and irritation. Highly toxic to fish and aquatic invertebrates.', 'Keep away from water bodies. Use protective clothing. Avoid skin contact. Do not apply in windy conditions. Store away from food and feed.', 'Cypermethrin 25% EC', 'Foliar spray', '7 days'),
('2,4-D', 'Herbicide', ARRAY['Wheat', 'Rice', 'Sugarcane', 'Lawns'], 'Moderate toxicity. May cause skin and eye irritation. Potentially carcinogenic with prolonged exposure.', 'Apply on calm days to prevent drift. Avoid contact with desirable plants. Wear protective gear. Do not apply near sensitive crops.', '2,4-D Amine Salt 58% SL', 'Post-emergence spray', '30 days'),
('Zinc Phosphide', 'Rodenticide', ARRAY['Field crops', 'Orchards', 'Storage areas'], 'Highly toxic to humans and animals if ingested. Releases toxic phosphine gas in stomach. Can cause multi-organ failure.', 'Use tamper-resistant bait stations. Keep away from children and pets. Wear gloves when handling. Dispose of dead rodents safely. Do not use near food storage.', 'Zinc Phosphide 80% WP', 'Bait application', 'N/A - Not for food crops'),
('Streptomycin', 'Bactericide', ARRAY['Apple', 'Pear', 'Tomatoes', 'Peppers'], 'May cause allergic reactions in sensitive individuals. Potential for antibiotic resistance development.', 'Limit applications to reduce resistance. Avoid contact with skin. Do not use on crops intended for export to certain countries. Alternate with copper-based products.', 'Streptomycin Sulphate 90% SP', 'Foliar spray', '14 days'),
('Thiamethoxam', 'Insecticide', ARRAY['Rice', 'Maize', 'Vegetables', 'Cotton'], 'Low acute toxicity to mammals. Highly toxic to bees. Persistent in soil and water.', 'Avoid application during flowering. Use as seed treatment when possible. Do not apply when pollinators are active. Follow IPM guidelines.', 'Thiamethoxam 25% WG', 'Seed treatment / Soil drench', '21 days'),
('Copper Hydroxide', 'Fungicide', ARRAY['Citrus', 'Grapes', 'Tomatoes', 'Coffee'], 'May cause skin and eye irritation. Copper accumulation in soil with repeated use. Phytotoxic in cool, wet conditions.', 'Do not apply in hot conditions. Avoid application before rain. Use lower rates on sensitive crops. Monitor soil copper levels.', 'Copper Hydroxide 77% WP', 'Foliar spray', 'Same day application safe'),
('Atrazine', 'Herbicide', ARRAY['Maize', 'Sugarcane', 'Sorghum'], 'Potential endocrine disruptor. Groundwater contaminant. May persist in soil for extended periods.', 'Do not use in areas with shallow water table. Apply only to labeled crops. Avoid runoff to water bodies. Use pre-emergence for best results.', 'Atrazine 50% WP', 'Pre-emergence spray', '60 days');