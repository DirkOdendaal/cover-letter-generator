"use client";

import { useEffect } from "react";

const ErrorComponent = ({ error, reset }: { error: Error; reset: () => void }) => {
	useEffect(() => {
		// Handle the error, e.g., log it to an error reporting service
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
};

export default ErrorComponent;
