"use server";

import { prompts } from "@/config/prompts";
import OpenAI from "openai";

export const generateCoverLetter = async (formData: {
	jobTitle: string;
	company: string;
	location: string;
	jobDescription: string;
	creativity: string;
}) => {
	try {
		const client = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const inputText = `Job Title: ${formData.jobTitle} 
    Company: ${formData.company} 
    Location: ${formData.location} 
    Job Description: ${formData.jobDescription} 
    Creativity Level: ${formData.creativity}`;

		const response = await client.responses.create({
			model: "gpt-4.1",
			input: `${prompts.coverLetter}${inputText}`,
			temperature: parseFloat(formData.creativity) / 100, // Map creativity level to temperature
		});

		return response.output_text; // Return the generated text
	} catch (error) {
		console.error("Error generating cover letter:", error);
		throw new Error("Failed to generate cover letter");
	}
};
