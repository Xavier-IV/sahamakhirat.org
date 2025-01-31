-- ✅ Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- ✅ Ensure RLS is enabled on the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ✅ Allow public read access to images in `project-images`
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
USING ( bucket_id = 'project-images' );

-- ✅ Allow only the owner to update or delete their files
CREATE POLICY "Allow owner update"
ON storage.objects
FOR UPDATE
USING ( auth.uid() = owner );

CREATE POLICY "Allow owner delete"
ON storage.objects
FOR DELETE
USING ( auth.uid() = owner );

CREATE POLICY "Allow authenticated users to upload"
ON storage.objects
FOR INSERT
WITH CHECK ( auth.uid() IS NOT NULL );
