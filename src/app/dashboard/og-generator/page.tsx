import { Header } from '@/app/components/header';
import OGGeneratorClient from './og-generator-client';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const OGGeneratorPage = async () => {
	return (
		<>
			<Header />
			<main className="flex-grow container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold">My Projects</h1>
					<div className="flex space-x-4">
						<Button asChild>
							<Link href="/dashboard/project/new">Add New Project</Link>
						</Button>
						<Button asChild variant="secondary">
							<Link href="/dashboard/og-generator">OG Generator</Link>
						</Button>
					</div>
				</div>
				<div className="max-w-md mx-auto mt-10">
					<Card>
						<CardHeader>
							<h1 className="text-2xl font-bold mb-4">OG Generator</h1>
						</CardHeader>
						<CardContent>
							<OGGeneratorClient />
						</CardContent>
					</Card>
				</div>
			</main>
		</>
	);
};

export default OGGeneratorPage;