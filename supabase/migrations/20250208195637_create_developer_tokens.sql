   -- Create table for developer tokens
   CREATE TABLE developer_tokens (
     id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
     token TEXT NOT NULL,
     expires_at TIMESTAMP NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Index for quick lookup
   CREATE INDEX idx_token ON developer_tokens (token);