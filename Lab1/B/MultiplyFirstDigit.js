function multiplyFirstDigit(num) {
    const d1 = Math.floor(num / 10);
    const d2 = num % 10;

    let result = 1;
    for (let i = 0; i < d2; i++) {
        result *= d1;
    }
    return result;
}

const num = 23;
console.log(multiplyFirstDigit(num))