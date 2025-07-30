import enquirer from "enquirer";
const { prompt } = enquirer;
// Form inputs
async function inputForms() {
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
        return result;
    }
    catch (err) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}
// Confirm message
async function retryOption() {
    let result;
    try {
        result = await prompt({
            type: "confirm",
            name: "answer",
            message: "Do you want to try again ?",
        });
        return result.answer;
    }
    catch (err) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}
export { inputForms, retryOption };
