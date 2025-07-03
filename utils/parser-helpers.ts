import { GlobalWorkerOptions, getDocument, version } from "pdfjs-dist/legacy/build/pdf.mjs";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.mjs`;

export const parsePdf = async (file?: File): Promise<string> => {
	if (!file) {
		throw new Error("No file provided for parsing.");
	}

	const arrayBuffer = await file.arrayBuffer();
	const pdfData = new Uint8Array(arrayBuffer);

	const loadingTask = getDocument({ data: pdfData });
	const pdf = await loadingTask.promise;

	let fullText = "";

	for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
		const page = await pdf.getPage(pageNum);
		const content = await page.getTextContent();
		const pageText = content.items.map((item: any) => item.str).join(" ");

		fullText += pageText + "\n";
	}

	return fullText.replaceAll(/\s+/g, " ").trim(); // Normalize whitespace
};
