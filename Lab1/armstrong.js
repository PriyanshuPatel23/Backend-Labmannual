function isArmstrong(n) {

    let original = n;
    let copy = n;
    let digits = 0;
    let ans = 0;
    let digit = 0;

    while (original > 0) {
        digits++;
        original = Math.floor(original / 10);
    }

    while (n > 0) {
        digit = n % 10;
        ans += digit ** digits;
        n = Math.floor(n / 10);
    }

    if (ans === copy) return true;

    return false;
}

console.log(isArmstrong(153))