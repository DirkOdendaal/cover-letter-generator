"use client";

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Input, Textarea, Slider, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { generateCoverLetter } from "@/api/openapi";
import { parsePdf } from "@/utils/parser-helpers";

const CoverLetterForm = () => {
	const jobTitleRef = useRef<HTMLInputElement>(null);
	const companyRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<HTMLInputElement>(null);
	const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);
	const creativityRef = useRef<HTMLElement>(null);
	const [parsedResume, setParsedResume] = useState<string>("");

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const isValid =
			jobTitleRef.current?.value?.trim() &&
			companyRef.current?.value?.trim() &&
			locationRef.current?.value?.trim() &&
			jobDescriptionRef.current?.value?.trim();

		setIsFormValid(Boolean(isValid));
	}, []);

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			setParsedResume("");
		}
		if (file && file.type === "application/pdf") {
			const text = await parsePdf(file);

			setParsedResume(text);
			console.log("Parsed Resume:", text);
		} else {
			setParsedResume("");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formData = {
			jobTitle: jobTitleRef.current?.value ?? "",
			company: companyRef.current?.value ?? "",
			location: locationRef.current?.value ?? "",
			jobDescription: jobDescriptionRef.current?.value ?? "",
			creativity: creativityRef.current?.getAttribute("aria-valuenow") ?? "50",
			parsedResume,
		};

		try {
			const coverLetter = await generateCoverLetter(formData);

			console.log("Generated Cover Letter:", coverLetter);
		} catch (error) {
			console.error("Error generating cover letter:", error);
		}
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit}>
			<Input
				ref={jobTitleRef}
				label="Job Title"
				placeholder="Enter the job title"
				startContent={<Icon icon="lucide:briefcase" />}
				onChange={() => setIsFormValid(Boolean(jobTitleRef.current?.value?.trim()))}
			/>
			<Input
				ref={companyRef}
				label="Company"
				placeholder="Enter the company name"
				startContent={<Icon icon="lucide:building" />}
				onChange={() => setIsFormValid(Boolean(jobTitleRef.current?.value?.trim()))}
			/>
			<Input
				ref={locationRef}
				label="Location"
				placeholder="Enter the job location"
				startContent={<Icon icon="lucide:map-pin" />}
				onChange={() => setIsFormValid(Boolean(jobTitleRef.current?.value?.trim()))}
			/>
			<Textarea
				ref={jobDescriptionRef}
				label="Job Description"
				minRows={4}
				placeholder="Paste the job description here"
				onChange={() => setIsFormValid(Boolean(jobTitleRef.current?.value?.trim()))}
			/>
			<div>
				<label className="block text-small font-medium mb-1" htmlFor="creativity-slider">
					Creativity Level
				</label>
				<Slider
					ref={creativityRef}
					aria-label="Creativity Level"
					className="max-w-md"
					defaultValue={50}
					id="creativity-slider"
					maxValue={100}
					minValue={0}
					step={1}
				/>
				<p className="text-small text-foreground-500 mt-1">Adjust creativity level</p>
			</div>
			<div>
				<label className="block text-small font-medium mb-1" htmlFor="cv-upload">
					Upload CV
				</label>
				<Input accept=".pdf" id="cv-upload" placeholder="Select your CV file" type="file" onChange={handleFileUpload} />
			</div>
			<Button color="primary" isDisabled={!isFormValid} type="submit">
				Generate Cover Letter
			</Button>
		</form>
	);
};

export default CoverLetterForm;
