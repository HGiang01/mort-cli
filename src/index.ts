// IMPORTS
import * as Constants from "./constants/index.js";

// TYPES AND INTERFACES
interface LoanInfo {
    loanPrincipal: number;
    yearOfLoan: number;
    annualRate?: number;
}

// CONSTANTS

// UNTILS
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
        return "📢 The loanPrincipal parameter isn't available";
    }

    // Year must be greater than 1 and positive
    if (loanInfo.yearOfLoan < 1 || loanInfo.yearOfLoan % 2 != 0) {
        return "📢 The yearOfLoan parameter isn't available";
    } else if (loanInfo.yearOfLoan >= Constants.MAXIMUM_YEARS) {
        return "😒 Are you human???";
    }

    // Annual Rate must be greater than or equal to 0
    if (loanInfo.annualRate) {
        if (loanInfo.annualRate < 0) {
            return "📢 The annualRate parameter isn't available";
        } else if (loanInfo.annualRate >= Constants.MAXIMUM_INTEREST_RATE) {
            return "😒 Are you human???";
        }
    }

    return true;
}

// MAIN FUNCTION
function monthlyPayment(loanInfo: LoanInfo): number | boolean {
    if (validateLoanInputs(loanInfo) != true) return false;

    const p: number = loanInfo.loanPrincipal;
    const n: number = yearToMonth(loanInfo.yearOfLoan);

    // Annual Rate equal to 0
    if (!loanInfo.annualRate) {
        return p / n
    }
        
    const r = toMonthlyInterestRate(loanInfo.annualRate);

    return p * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));
}

// UI/DISPLAY FUNCTIONS

// MAIN EXECUTION

// EXPORTS
