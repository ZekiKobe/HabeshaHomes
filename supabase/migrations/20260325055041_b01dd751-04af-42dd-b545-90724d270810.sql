-- ============================================================
-- HabeshaHomes Real Estate Management System — Full Migration
-- ============================================================

-- ENUMS
CREATE TYPE public.app_role AS ENUM ('admin', 'agent', 'buyer');
CREATE TYPE public.property_type_enum AS ENUM ('apartment', 'villa', 'land', 'commercial', 'house');
CREATE TYPE public.price_type_enum AS ENUM ('sale', 'rent');
CREATE TYPE public.property_status_enum AS ENUM ('available', 'sold', 'rented', 'pending');
CREATE TYPE public.inquiry_status_enum AS ENUM ('new', 'read', 'replied', 'closed');
CREATE TYPE public.visit_status_enum AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- LOCATION HIERARCHY
CREATE TABLE public.countries (
  id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE
);

CREATE TABLE public.regions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE
);

CREATE TABLE public.zones (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name      text NOT NULL,
  region_id uuid NOT NULL REFERENCES public.regions(id) ON DELETE CASCADE
);

CREATE TABLE public.woredas (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name    text NOT NULL,
  zone_id uuid NOT NULL REFERENCES public.zones(id) ON DELETE CASCADE
);

CREATE INDEX idx_regions_country_id ON public.regions(country_id);
CREATE INDEX idx_zones_region_id    ON public.zones(region_id);
CREATE INDEX idx_woredas_zone_id    ON public.woredas(zone_id);

-- PROFILES
CREATE TABLE public.profiles (
  id             uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          text NOT NULL,
  full_name      text,
  avatar_url     text,
  phone          text,
  bio            text,
  company_name   text,
  license_number text,
  is_verified    boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);

-- USER ROLES
CREATE TABLE public.user_roles (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role    public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- SECURITY DEFINER helpers
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS public.app_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1;
$$;

-- SUBSCRIPTION PLANS
CREATE TABLE public.subscription_plans (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  price_monthly numeric(10,2) NOT NULL DEFAULT 0,
  max_listings  int NOT NULL DEFAULT 5,
  features      text[] NOT NULL DEFAULT '{}',
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- PROPERTIES
CREATE TABLE public.properties (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  description   text,
  price         numeric(15,2) NOT NULL,
  price_type    public.price_type_enum NOT NULL DEFAULT 'sale',
  property_type public.property_type_enum NOT NULL DEFAULT 'apartment',
  status        public.property_status_enum NOT NULL DEFAULT 'available',
  bedrooms      int,
  bathrooms     int,
  area_sqm      numeric(10,2),
  floor_number  int,
  total_floors  int,
  country_id    uuid REFERENCES public.countries(id) ON DELETE SET NULL,
  region_id     uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  zone_id       uuid REFERENCES public.zones(id) ON DELETE SET NULL,
  woreda_id     uuid REFERENCES public.woredas(id) ON DELETE SET NULL,
  address       text,
  latitude      double precision,
  longitude     double precision,
  amenities     text[] NOT NULL DEFAULT '{}',
  is_featured   boolean NOT NULL DEFAULT false,
  is_approved   boolean NOT NULL DEFAULT false,
  view_count    int NOT NULL DEFAULT 0,
  agent_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_properties_agent_id    ON public.properties(agent_id);
CREATE INDEX idx_properties_status      ON public.properties(status);
CREATE INDEX idx_properties_type        ON public.properties(property_type);
CREATE INDEX idx_properties_price_type  ON public.properties(price_type);
CREATE INDEX idx_properties_region_id   ON public.properties(region_id);
CREATE INDEX idx_properties_is_approved ON public.properties(is_approved);
CREATE INDEX idx_properties_is_featured ON public.properties(is_featured);
CREATE INDEX idx_properties_fts ON public.properties USING GIN (
  to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(address,''))
);

-- PROPERTY IMAGES
CREATE TABLE public.property_images (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url         text NOT NULL,
  is_primary  boolean NOT NULL DEFAULT false,
  order_index int NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);

-- FAVORITES
CREATE TABLE public.favorites (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, property_id)
);

CREATE INDEX idx_favorites_user_id     ON public.favorites(user_id);
CREATE INDEX idx_favorites_property_id ON public.favorites(property_id);

-- INQUIRIES
CREATE TABLE public.inquiries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  buyer_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message     text NOT NULL,
  status      public.inquiry_status_enum NOT NULL DEFAULT 'new',
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_inquiries_property_id ON public.inquiries(property_id);
CREATE INDEX idx_inquiries_buyer_id    ON public.inquiries(buyer_id);
CREATE INDEX idx_inquiries_agent_id    ON public.inquiries(agent_id);

-- VISITS
CREATE TABLE public.visits (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  buyer_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  status       public.visit_status_enum NOT NULL DEFAULT 'pending',
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_visits_property_id ON public.visits(property_id);
CREATE INDEX idx_visits_buyer_id    ON public.visits(buyer_id);
CREATE INDEX idx_visits_agent_id    ON public.visits(agent_id);

-- REVIEWS
CREATE TABLE public.reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating      int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (agent_id, reviewer_id)
);

CREATE INDEX idx_reviews_agent_id    ON public.reviews(agent_id);
CREATE INDEX idx_reviews_reviewer_id ON public.reviews(reviewer_id);

-- RECENTLY VIEWED
CREATE TABLE public.recently_viewed (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  viewed_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, property_id)
);

CREATE INDEX idx_recently_viewed_user_id ON public.recently_viewed(user_id);

-- TRIGGERS
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'buyer')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.record_property_view(_user_id uuid, _property_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.properties SET view_count = view_count + 1 WHERE id = _property_id;
  IF _user_id IS NOT NULL THEN
    INSERT INTO public.recently_viewed (user_id, property_id, viewed_at)
    VALUES (_user_id, _property_id, now())
    ON CONFLICT (user_id, property_id) DO UPDATE SET viewed_at = now();
  END IF;
END;
$$;

-- ROW LEVEL SECURITY
ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.woredas            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- USER ROLES policies
CREATE POLICY "Users can view their own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- LOCATION policies
CREATE POLICY "Anyone can view countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Admins can manage countries" ON public.countries FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can view regions" ON public.regions FOR SELECT USING (true);
CREATE POLICY "Admins can manage regions" ON public.regions FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can view zones" ON public.zones FOR SELECT USING (true);
CREATE POLICY "Admins can manage zones" ON public.zones FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can view woredas" ON public.woredas FOR SELECT USING (true);
CREATE POLICY "Admins can manage woredas" ON public.woredas FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- PROPERTIES policies
CREATE POLICY "Anyone can view approved properties" ON public.properties FOR SELECT USING (is_approved = true);
CREATE POLICY "Agents can view own properties" ON public.properties FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can view all properties" ON public.properties FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Agents and admins can insert properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = agent_id AND (public.has_role(auth.uid(), 'agent') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Agents can update own properties" ON public.properties FOR UPDATE USING (auth.uid() = agent_id) WITH CHECK (auth.uid() = agent_id);
CREATE POLICY "Admins can update any property" ON public.properties FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Agents can delete own properties" ON public.properties FOR DELETE USING (auth.uid() = agent_id);
CREATE POLICY "Admins can delete any property" ON public.properties FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- PROPERTY IMAGES policies
CREATE POLICY "Anyone can view property images" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "Agents can manage their property images" ON public.property_images FOR ALL USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.agent_id = auth.uid()));
CREATE POLICY "Admins can manage all images" ON public.property_images FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- FAVORITES policies
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- INQUIRIES policies
CREATE POLICY "Buyers can view own inquiries" ON public.inquiries FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Agents can view inquiries for their properties" ON public.inquiries FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can view all inquiries" ON public.inquiries FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can send inquiries" ON public.inquiries FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Agents can update inquiry status" ON public.inquiries FOR UPDATE USING (auth.uid() = agent_id);

-- VISITS policies
CREATE POLICY "Buyers can view own visits" ON public.visits FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Agents can view scheduled visits" ON public.visits FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can view all visits" ON public.visits FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can schedule visits" ON public.visits FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Agents can update visit status" ON public.visits FOR UPDATE USING (auth.uid() = agent_id);
CREATE POLICY "Buyers can cancel their visits" ON public.visits FOR UPDATE USING (auth.uid() = buyer_id);

-- REVIEWS policies
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can write reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Reviewers can update own review" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "Reviewers can delete own review" ON public.reviews FOR DELETE USING (auth.uid() = reviewer_id);
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RECENTLY VIEWED policies
CREATE POLICY "Users can view own history" ON public.recently_viewed FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own history" ON public.recently_viewed FOR ALL USING (auth.uid() = user_id);

-- SUBSCRIPTION PLANS policies
CREATE POLICY "Anyone can view active plans" ON public.subscription_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage plans" ON public.subscription_plans FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- SEED DATA: Ethiopia Location Hierarchy
INSERT INTO public.countries (id, name, code) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Ethiopia', 'ET');

INSERT INTO public.regions (id, name, country_id) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Addis Ababa',         '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000002', 'Oromia',              '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000003', 'Amhara',              '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000004', 'Tigray',              '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000005', 'SNNPR',               '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000006', 'Somali',              '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000007', 'Afar',                '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000008', 'Dire Dawa',           '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000009', 'Harari',              '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000010', 'Benishangul-Gumuz',   '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000011', 'Gambela',             '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000012', 'Sidama',              '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000013', 'South West Ethiopia', '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000014', 'Central Ethiopia',    '00000000-0000-0000-0000-000000000001');

INSERT INTO public.zones (id, name, region_id) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Addis Ketema',     '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002', 'Akaky Kaliti',     '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000003', 'Arada',            '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000004', 'Bole',             '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000005', 'Gullele',          '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000006', 'Kirkos',           '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000007', 'Kolfe Keranio',    '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000008', 'Lideta',           '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000009', 'Nifas Silk-Lafto', '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000010', 'Yeka',             '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000011', 'Lemi Kura',        '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000020', 'West Hararghe',        '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000021', 'East Hararghe',        '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000022', 'Arsi',                 '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000023', 'Bale',                 '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000024', 'Borena',               '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000025', 'Guji',                 '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000026', 'Illubabor',            '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000027', 'Jimma',                '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000028', 'West Shewa',           '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000029', 'North Shewa (Oromia)', '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000030', 'East Shewa',           '10000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000040', 'North Gondar',         '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000041', 'South Gondar',         '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000042', 'North Wollo',          '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000043', 'South Wollo',          '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000044', 'North Shewa (Amhara)', '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000045', 'East Gojjam',          '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000046', 'West Gojjam',          '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000047', 'Awi',                  '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000048', 'Wag Hemra',            '10000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000050', 'Central Tigray',       '10000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000051', 'Eastern Tigray',       '10000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000052', 'North West Tigray',    '10000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000053', 'Southern Tigray',      '10000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000054', 'Western Tigray',       '10000000-0000-0000-0000-000000000004');

INSERT INTO public.woredas (id, name, zone_id) VALUES
  ('30000000-0000-0000-0000-000000000001', 'Woreda 01 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000002', 'Woreda 02 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000003', 'Woreda 03 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000004', 'Woreda 04 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000005', 'Woreda 05 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000006', 'Woreda 06 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000007', 'Woreda 07 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000008', 'Woreda 08 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000009', 'Woreda 09 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000010', 'Woreda 10 (Bole)',      '20000000-0000-0000-0000-000000000004'),
  ('30000000-0000-0000-0000-000000000011', 'Woreda 01 (Yeka)',      '20000000-0000-0000-0000-000000000010'),
  ('30000000-0000-0000-0000-000000000012', 'Woreda 02 (Yeka)',      '20000000-0000-0000-0000-000000000010'),
  ('30000000-0000-0000-0000-000000000013', 'Woreda 03 (Yeka)',      '20000000-0000-0000-0000-000000000010'),
  ('30000000-0000-0000-0000-000000000014', 'Woreda 04 (Yeka)',      '20000000-0000-0000-0000-000000000010'),
  ('30000000-0000-0000-0000-000000000015', 'Woreda 05 (Yeka)',      '20000000-0000-0000-0000-000000000010'),
  ('30000000-0000-0000-0000-000000000016', 'Woreda 01 (Kirkos)',    '20000000-0000-0000-0000-000000000006'),
  ('30000000-0000-0000-0000-000000000017', 'Woreda 02 (Kirkos)',    '20000000-0000-0000-0000-000000000006'),
  ('30000000-0000-0000-0000-000000000018', 'Woreda 03 (Kirkos)',    '20000000-0000-0000-0000-000000000006'),
  ('30000000-0000-0000-0000-000000000019', 'Woreda 04 (Kirkos)',    '20000000-0000-0000-0000-000000000006'),
  ('30000000-0000-0000-0000-000000000020', 'Woreda 05 (Kirkos)',    '20000000-0000-0000-0000-000000000006'),
  ('30000000-0000-0000-0000-000000000021', 'Woreda 01 (Arada)',     '20000000-0000-0000-0000-000000000003'),
  ('30000000-0000-0000-0000-000000000022', 'Woreda 02 (Arada)',     '20000000-0000-0000-0000-000000000003'),
  ('30000000-0000-0000-0000-000000000023', 'Woreda 03 (Arada)',     '20000000-0000-0000-0000-000000000003'),
  ('30000000-0000-0000-0000-000000000024', 'Woreda 04 (Arada)',     '20000000-0000-0000-0000-000000000003'),
  ('30000000-0000-0000-0000-000000000025', 'Woreda 01 (Nifas Silk)','20000000-0000-0000-0000-000000000009'),
  ('30000000-0000-0000-0000-000000000026', 'Woreda 02 (Nifas Silk)','20000000-0000-0000-0000-000000000009'),
  ('30000000-0000-0000-0000-000000000027', 'Woreda 03 (Nifas Silk)','20000000-0000-0000-0000-000000000009'),
  ('30000000-0000-0000-0000-000000000028', 'Woreda 04 (Nifas Silk)','20000000-0000-0000-0000-000000000009'),
  ('30000000-0000-0000-0000-000000000029', 'Woreda 05 (Nifas Silk)','20000000-0000-0000-0000-000000000009'),
  ('30000000-0000-0000-0000-000000000030', 'Woreda 06 (Nifas Silk)','20000000-0000-0000-0000-000000000009'),
  ('30000000-0000-0000-0000-000000000031', 'Bishoftu',              '20000000-0000-0000-0000-000000000030'),
  ('30000000-0000-0000-0000-000000000032', 'Adama (Nazret)',        '20000000-0000-0000-0000-000000000030'),
  ('30000000-0000-0000-0000-000000000033', 'Mojo',                  '20000000-0000-0000-0000-000000000030'),
  ('30000000-0000-0000-0000-000000000034', 'Liben',                 '20000000-0000-0000-0000-000000000030'),
  ('30000000-0000-0000-0000-000000000035', 'Dukem',                 '20000000-0000-0000-0000-000000000030'),
  ('30000000-0000-0000-0000-000000000036', 'Mekelle Ayder',         '20000000-0000-0000-0000-000000000050'),
  ('30000000-0000-0000-0000-000000000037', 'Mekelle Hadnet',        '20000000-0000-0000-0000-000000000050'),
  ('30000000-0000-0000-0000-000000000038', 'Mekelle Kedamay',       '20000000-0000-0000-0000-000000000050'),
  ('30000000-0000-0000-0000-000000000039', 'Mekelle Semien',        '20000000-0000-0000-0000-000000000050');

-- SEED DATA: Subscription Plans
INSERT INTO public.subscription_plans (name, price_monthly, max_listings, features) VALUES
  ('Free',       0,    3,   ARRAY['3 listings', 'Basic visibility', 'Email support']),
  ('Starter',    499,  10,  ARRAY['10 listings', 'Featured in search', 'Priority support', 'Analytics']),
  ('Pro',        1499, 50,  ARRAY['50 listings', 'Featured boost', '24/7 support', 'Advanced analytics', 'AI description generator']),
  ('Enterprise', 4999, 999, ARRAY['Unlimited listings', 'Top placement', 'Dedicated manager', 'Custom branding', 'API access']);