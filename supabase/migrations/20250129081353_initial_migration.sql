CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    website TEXT,
    readme TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public to read projects
CREATE POLICY "Public can read projects"
ON projects
FOR SELECT USING (true);

-- Only project owners can update or delete their own projects
CREATE POLICY "Project owners can update their projects"
ON projects
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Project owners can delete their projects"
ON projects
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- Allow any authenticated user to insert new projects
CREATE POLICY "Authenticated users can create projects"
ON projects
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE TABLE maintainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE maintainers ENABLE ROW LEVEL SECURITY;

-- Allow public to read maintainers
CREATE POLICY "Public can read maintainers"
ON maintainers
FOR SELECT USING (true);

-- Only maintainers can update or delete their own record
CREATE POLICY "Maintainers can update their own record"
ON maintainers
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Maintainers can delete their own record"
ON maintainers
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- Only project owners can add maintainers
CREATE POLICY "Project owners can add maintainers"
ON maintainers
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
        SELECT 1 FROM projects WHERE projects.id = maintainers.project_id AND projects.user_id = auth.uid()
    )
);

CREATE TABLE contributors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;

-- Allow public to read contributors
CREATE POLICY "Public can read contributors"
ON contributors
FOR SELECT USING (true);

-- Only contributors can update or delete their own record
CREATE POLICY "Contributors can update their own record"
ON contributors
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Contributors can delete their own record"
ON contributors
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- Only project owners can add contributors
CREATE POLICY "Project owners can add contributors"
ON contributors
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
        SELECT 1 FROM projects WHERE projects.id = contributors.project_id AND projects.user_id = auth.uid()
    )
);

-- Automatically update `updated_at` on row modification
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_projects
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_maintainers
BEFORE UPDATE ON maintainers
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_update_contributors
BEFORE UPDATE ON contributors
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
