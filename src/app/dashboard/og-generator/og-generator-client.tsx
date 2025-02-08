"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const OGGeneratorClient = () => {
	const [formData, setFormData] = useState({
		url: '',
		title: '',
		description: ''
	});
	const [generatedURL, setGeneratedURL] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { url, title, description } = formData;
		const urlString = `/api/og?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
		setGeneratedURL(urlString);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label className="block text-sm font-medium text-gray-700">URL:</Label>
					<Input
						type="text"
						name="url"
						value={formData.url}
						onChange={handleChange}
						className="mt-1 block w-full"
					/>
				</div>
				<div>
					<Label className="block text-sm font-medium text-gray-700">Title:</Label>
					<Input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="mt-1 block w-full"
					/>
				</div>
				<div>
					<Label className="block text-sm font-medium text-gray-700">Description:</Label>
					<Input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 block w-full"
					/>
				</div>
				<Button
					type="submit"
					className="w-full"
				>
					Generate OG URL
				</Button>
			</form>
			{generatedURL && (
				<a href={generatedURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
					Open Generated URL
				</a>
			)}
		</>
	);
};

export default OGGeneratorClient; 