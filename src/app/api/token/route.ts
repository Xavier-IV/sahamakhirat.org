import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { logtail } from "@/lib/logtail/server";

export async function GET(request: Request) {
	try {
		const supabase = await createClient();
		const { data: { user }, error: userError } = await supabase.auth.getUser();

		if (userError || !user) {
			logtail.error("Unauthorized access attempt", { error: userError });
			return new Response("Unauthorized", { status: 401 });
		}

		const now = new Date();

		// Check for existing token
		const { data: existingToken, error: tokenError } = await supabase
			.from('developer_tokens')
			.select('*')
			.eq('user_id', user.id)
			.gt('expires_at', now.toISOString())
			.single();

		if (tokenError) {
			logtail.error("Error fetching existing token", { error: tokenError });
		}

		if (existingToken) {
			logtail.info("Existing token found", { token: existingToken.token });
			return new Response(`Token: ${existingToken.token}`, { status: 200 });
		}

		const token = uuidv4();
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

		const { data, error } = await supabase
			.from('developer_tokens')
			.insert([{ token, user_id: user.id, expires_at: expiresAt }]);

		if (error) {
			logtail.error("Failed to create new token", { error });
			return new Response("Failed to create token", { status: 500 });
		}

		logtail.info("New token created", { token });
		return new Response(`Token: ${token}`, { status: 200 });
	} catch (error) {
		logtail.error("Unexpected error in token generation", { error });
		return new Response("Internal Server Error", { status: 500 });
	} finally {
		logtail.flush();
	}
}
