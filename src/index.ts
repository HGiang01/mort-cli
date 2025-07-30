// -----------------------------------------------
// IMPORTS
// -----------------------------------------------
import * as Constants from "./constants/index.js";
import * as Inputs from './utils/inputTerminal.js'
import * as Outputs from "./utils/outputTerminal.js";

// -----------------------------------------------
// TYPES AND INTERFACES
// -----------------------------------------------
interface LoanInfo {
    loanPrincipal: number;
    yearOfLoan: number;
    annualRate: number;
}

// -----------------------------------------------
// SUBFUNCTIONS
// -----------------------------------------------
// Convert annual rate (%) to monthly interest rate (float)
function toMonthlyInterestRate(annualRate: number): number {
    return annualRate / 12 / 100;
}

function yearToMonth(year: number): number {
    return year * 12;
}

function validateLoanInputs(loanInfo: LoanInfo): string | boolean {
    // Loan amount must be positive
    if (loanInfo.loanPrincipal <= 0) {
        throw new Error("📢 The Loan Principal is invalid");
    }

    // Year must be greater than 1 and integer number
    if (loanInfo.yearOfLoan < 1 || !Number.isInteger(loanInfo.yearOfLoan)) {
        throw new Error("📢 The year is invalid");
    } else if (loanInfo.yearOfLoan >= Constants.MAXIMUM_YEARS) {
        throw new Error(
            "😒 The number of years is too large, can you live that long to pay off the debt ???"
        );
    }

    // Annual Rate must be greater than or equal to 0
    if (loanInfo.annualRate) {
        if (loanInfo.annualRate < 0) {
            throw new Error("📢 The Annual Rate is invalid");
        } else if (loanInfo.annualRate >= Constants.MAXIMUM_INTEREST_RATE) {
            throw new Error("😒 Are you robber ???");
        }
    }

    return true;
}

// -----------------------------------------------
// MAIN FUNCTION
// -----------------------------------------------
function monthlyPayment(loanInfo: LoanInfo): number {
    const p: number = loanInfo.loanPrincipal;
    const n: number = yearToMonth(loanInfo.yearOfLoan);

    // Annual Rate equal to 0
    if (loanInfo.annualRate == 0) {
        return p / n;
    }

    const r = toMonthlyInterestRate(loanInfo.annualRate);

    return p * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));
}

// -----------------------------------------------
// MAIN EXECUTION
// -----------------------------------------------
async function main(): Promise<number> {
    let result: number = 0;
    let messResult: string;
    let shouldContinue = true;

    while (shouldContinue) {
        try {
            // Render app name
            await Outputs.logMessage("Mortgage CLI");

            // Form inputs
            const loanInfo = await Inputs.inputForms();

            // Validate field inputs
            if (validateLoanInputs(loanInfo)) {
                // Calculate monthly payment for loan
                result = monthlyPayment(loanInfo);
            }

            // Render result
            messResult = Outputs.moneyFormat(result.toFixed(4));
            await Outputs.messageRainbow(messResult);

            // Retry option
            shouldContinue = await Inputs.retryOption();
            if (shouldContinue) {
                console.clear();
            }
            
        } catch (err) {
            console.log(err);

            // Retry option
            shouldContinue = await Inputs.retryOption();
            if (shouldContinue) {
                console.clear();
            }
        }
    }

    return result;
}

main();

// -----------------------------------------------
// EXPORTS
// -----------------------------------------------
export type { LoanInfo };
export default main;
