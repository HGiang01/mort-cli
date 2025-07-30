import enquirer from "enquirer";
import { LoanInfo } from "../index.js";

const { prompt } = enquirer;

// Form inputs
async function inputForms(): Promise<LoanInfo> {
    let result;

    try {
        result = await prompt([
            {
                type: "numeral",
                name: "loanPrincipal",
                message: "How much did you borrow to buy your home?:",
            },
            {
                type: "numeral",
                name: "yearOfLoan",
                message: "How many years do you borrow for?:",
            },
            {
                type: "numeral",
                name: "annualRate",
                message: "What is the annual interest rate?:",
            },
        ]);

        return result as LoanInfo;
    } catch (err: unknown) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}

// Confirm message
async function retryOption(): Promise<boolean> {
    let result: { answer: boolean };

    try {
        result = await prompt({
            type: "confirm",
            name: "answer",
            message: "Do you want to try again ?",
        });

        return result.answer;
    } catch (err: unknown) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}

export { inputForms, retryOption };
