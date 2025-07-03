"use server";

import { prompts } from "@/config/prompts";
import OpenAI from "openai";

export const generateCoverLetter = async (formData: {
	jobTitle: string;
	company: string;
	location: string;
	jobDescription: string;
	creativity: string;
	parsedResume: string;
}) => {
	try {
		const client = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const temperature = parseFloat(formData.creativity) / 100; // Map creativity level to temperature

		const payload = {
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system" as const,
					content: prompts.completeCoverLetter,
				},
				{
					role: "user" as const,
					content: `My Resume: ${formData.parsedResume}. Job Title: ${formData.jobTitle}. Company: ${formData.company}. Location: ${formData.location}. Job Description: ${formData.jobDescription}.`,
				},
			],
			temperature,
		};

		const response = await client.chat.completions.create(payload);

		return response.choices[0]?.message?.content ?? "Failed to generate cover letter";
	} catch (error) {
		throw new Error(`Failed to generate cover letter: ${error instanceof Error ? error.message : "Unknown error"}`);
	}
};
