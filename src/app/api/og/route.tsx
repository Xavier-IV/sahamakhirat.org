import { logtail } from "@/lib/logtail/server";
import { renderScreenshotWithPuppeteer } from "@/lib/puppeteer";
import { createClient } from "@/lib/supabase/server";
import { ImageResponse } from "next/og";


const SampleComponent = ({ url, title, description, screenshot }: { url: string; title: string; description: string; screenshot: Buffer }) => {
	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-end',
				background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
				backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 1%, transparent 0%)',
				backgroundSize: '100px 100px',
				fontSize: 32,
				fontWeight: 600,
			}}
		>
			<div style={{ marginTop: 40, fontSize: 50, fontWeight: 'normal' }}>{title}</div>
			<div style={{ marginTop: 10, fontSize: 20 }}>{description}</div>
			<div style={{ marginTop: 20, fontSize: 14 }}>{url}</div>
			<div
				style={{
					display: 'flex',
					width: 900,
					height: 400,
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
					overflow: 'hidden',
					marginTop: 20,
					borderTop: '2px solid lightgray', // Border only on top
					borderLeft: '2px solid lightgray', // Border on left
					borderRight: '2px solid lightgray', // Border on right
				}}
			>
				<img src={`data:image/jpeg;base64,${screenshot.toString('base64')}`} width={900} height={700} />
			</div>
		</div>
	);
};

export async function GET(request: Request) {
	try {
		const supabase = await createClient();

		const { data: user } = await supabase.auth.getUser();

		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}

		logtail.info("OG image requested");

		const url = new URL(request.url).searchParams.get('url') || 'https://example.com';
		const title = new URL(request.url).searchParams.get('title') || 'No Title';
		const description = new URL(request.url).searchParams.get('description') || 'No Description';

		logtail.info('Generating OG for url', { url });
		const screenshot = await renderScreenshotWithPuppeteer(url);
		return new ImageResponse(<SampleComponent url={url} title={title} description={description} screenshot={screenshot} />);
	} catch (error) {
		logtail.error("Error generating image", { error });
		return new Response("Failed to generate image", { status: 500 });
	} finally {
		logtail.flush();
	}
}
