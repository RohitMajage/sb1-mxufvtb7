/*
  # Create resumes table

  1. New Tables
    - `resumes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `data` (jsonb, stores resume data)
      - `template` (text, stores template name)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `resumes` table
    - Add policies for authenticated users to manage their own resumes
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  data jsonb NOT NULL,
  template text NOT NULL DEFAULT 'modern',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own resumes
CREATE POLICY "Users can insert their own resumes"
  ON resumes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to view their own resumes
CREATE POLICY "Users can view their own resumes"
  ON resumes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to update their own resumes
CREATE POLICY "Users can update their own resumes"
  ON resumes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own resumes
CREATE POLICY "Users can delete their own resumes"
  ON resumes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();