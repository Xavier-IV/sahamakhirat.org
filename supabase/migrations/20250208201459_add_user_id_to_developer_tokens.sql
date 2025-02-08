   -- Add user_id column to developer_tokens table
   ALTER TABLE developer_tokens
   ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;