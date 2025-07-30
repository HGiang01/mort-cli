import chalkAnimation from "chalk-animation";
import figlet from "figlet";
// Create ASCII art from text
async function logMessage(mess) {
    return new Promise((resolve, reject) => {
        figlet(mess, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(data);
            resolve();
        });
    });
}
// Render result rainbow
async function messageRainbow(mess) {
    return new Promise((resolve) => {
        const rainbow = chalkAnimation.rainbow(mess);
        // Set time to run rainbow message
        setTimeout(() => {
            rainbow.stop();
            resolve();
        }, 1000);
    });
}
// Format money
function moneyFormat(str) {
    let fraction = str.slice(str.indexOf(".") + 1, str.length);
    let integer = str.slice(0, str.indexOf("."));
    let result = [];
    let x;
    let y;
    for (let i = 0; i < integer.length; i += 3) {
        x = integer.length - i - 3;
        y = integer.length - i;
        if (x <= 0) {
            x = 0;
        }
        result.unshift(integer.slice(x, y));
        if (x == 0) {
            break;
        }
    }
    return `${result.join(".")},${fraction} VND per month`;
}
export { logMessage, messageRainbow, moneyFormat };
