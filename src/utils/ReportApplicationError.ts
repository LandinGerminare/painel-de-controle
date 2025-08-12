import { ApplicationError, BoundaryError } from "@/types/ApplicationError";

let reportedErrors: Set<string> = new Set();

function generateErrorId(error: ApplicationError | BoundaryError): string {
    if ("request" in error) {
        return `${error.type}-${error.request?.url}-${error.text}`;
    } else {
        return `${error.type}-${error.text}`;
    }
}

export async function reportApplicationError(
    error: ApplicationError | BoundaryError
) {
    const errorId = generateErrorId(error);

    if (!reportedErrors.has(errorId)) {
        reportedErrors.add(errorId);

        await fetch("/api/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(error),
        });
    }
}
