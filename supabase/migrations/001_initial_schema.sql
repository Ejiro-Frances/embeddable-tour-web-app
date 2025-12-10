-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tours table
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create steps table
CREATE TABLE steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  order_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tour_id, order_number)
);

-- Create tour_analytics table for tracking tour usage
CREATE TABLE tour_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'started', 'completed', 'abandoned', 'step_completed', 'step_skipped'
  step_id UUID REFERENCES steps(id) ON DELETE SET NULL,
  session_id TEXT, -- To track individual sessions
  device_type TEXT, -- 'mobile', 'desktop', 'tablet'
  duration_seconds INTEGER, -- For completed tours/steps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_tours_user_id ON tours(user_id);
CREATE INDEX idx_steps_tour_id ON steps(tour_id);
CREATE INDEX idx_analytics_tour_id ON tour_analytics(tour_id);
CREATE INDEX idx_analytics_event_type ON tour_analytics(event_type);
CREATE INDEX idx_analytics_created_at ON tour_analytics(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tours
CREATE POLICY "Public can view tours"
  ON tours FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own tours"
  ON tours FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tours"
  ON tours FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tours"
  ON tours FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for steps
CREATE POLICY "Public can view steps"
  ON steps FOR SELECT
  USING (true);


CREATE POLICY "Users can create steps for their tours"
  ON steps FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM tours WHERE tours.id = steps.tour_id AND tours.user_id = auth.uid()
  ));

CREATE POLICY "Users can update steps of their tours"
  ON steps FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM tours WHERE tours.id = steps.tour_id AND tours.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete steps of their tours"
  ON steps FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM tours WHERE tours.id = steps.tour_id AND tours.user_id = auth.uid()
  ));

-- RLS Policies for tour_analytics
CREATE POLICY "Users can view analytics for their tours"
  ON tour_analytics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM tours WHERE tours.id = tour_analytics.tour_id AND tours.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can insert analytics" -- For public embeds
  ON tour_analytics FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM tours WHERE tours.id = tour_analytics.tour_id
  ));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_tours_updated_at
  BEFORE UPDATE ON tours
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_steps_updated_at
  BEFORE UPDATE ON steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
