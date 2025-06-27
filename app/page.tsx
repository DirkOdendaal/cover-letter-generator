import CoverLetterForm from "@/components/cover-letter-form";
import { Card } from "@heroui/card";

const HomPage = () => {
	return (
		<div className="h-full bg-background flex flex-col items-center justify-center p-4 gap-3">
			<div className="flex flex-col items-center gap-1 w-full">
				<span className="text-2xl font-bold text-foreground">Cover letters!</span>
				<span className="text-xl text-foreground-500">That sound like you</span>
			</div>

			<Card className="w-full max-w-3xl p-5 border border-primary">
				<CoverLetterForm />
			</Card>
		</div>
	);
};

export default HomPage;
