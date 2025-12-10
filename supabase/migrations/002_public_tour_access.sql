-- Migration: Allow public read access to tours for widget embedding
-- This allows the embeddable widget to fetch tour data without authentication

-- Add policy to allow anyone to SELECT tours (for embed widget)
CREATE POLICY "Anyone can view tours for embedding"
    ON tours
    FOR SELECT
    USING (true);

-- Add policy to allow anyone to view steps (for embed widget)
CREATE POLICY "Anyone can view steps for embedding"
    ON steps
    FOR SELECT
    USING (true);
