import { redirectTo } from "./redirectTo";
import { showError } from "./showError";

class CodeNotFoundError extends Error {
    constructor() {
        super("Code not found");
        this.name = "CodeNotFoundError";
    }
}

class StudentCodeNotFoundError extends CodeNotFoundError {
    constructor() {
        super();
        this.name = "StudentCodeNotFoundError";
        showError(
            undefined,
            "Student code not found",
        );

        redirectTo("login");

    }
}

class StudentCodeInvalidError extends Error {
    constructor() {
        super("Student code invalid");
        this.name = "StudentCodeInvalidError";
        showError(
            undefined,
            "Student code invalid",
        );
    }
}

export { CodeNotFoundError, StudentCodeNotFoundError, StudentCodeInvalidError };