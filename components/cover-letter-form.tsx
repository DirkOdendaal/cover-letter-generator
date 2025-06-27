"use client";
import React, { ChangeEvent, FormEvent, useRef } from "react";
import { Input, Textarea, Slider, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const CoverLetterForm = () => {
	const jobTitleRef = useRef<HTMLInputElement>(null);
	const companyRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<HTMLInputElement>(null);
	const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);
	const creativityRef = useRef<HTMLElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (_e: ChangeEvent<HTMLInputElement>) => {
		// File handling is now done via ref
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const formData = {
			jobTitle: jobTitleRef.current?.value ?? "",
			company: companyRef.current?.value ?? "",
			location: locationRef.current?.value ?? "",
			jobDescription: jobDescriptionRef.current?.value ?? "",
			creativity: creativityRef.current?.getAttribute("aria-valuenow") ?? "50",
			file: fileRef.current?.files?.[0] ?? null,
		};

		// eslint-disable-next-line no-console
		console.log(formData);
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit}>
			<Input
				ref={jobTitleRef}
				label="Job Title"
				placeholder="Enter the job title"
				startContent={<Icon icon="lucide:briefcase" />}
			/>
			<Input
				ref={companyRef}
				label="Company"
				placeholder="Enter the company name"
				startContent={<Icon icon="lucide:building" />}
			/>
			<Input
				ref={locationRef}
				label="Location"
				placeholder="Enter the job location"
				startContent={<Icon icon="lucide:map-pin" />}
			/>
			<Textarea
				ref={jobDescriptionRef}
				label="Job Description"
				minRows={4}
				placeholder="Paste the job description here"
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
				<Input
					ref={fileRef}
					accept=".pdf,.doc,.docx"
					id="cv-upload"
					placeholder="Select your CV file"
					type="file"
					onChange={handleFileChange}
				/>
			</div>
			<Button color="primary" type="submit">
				Generate Cover Letter
			</Button>
		</form>
	);
};

export default CoverLetterForm;
