function gcd(n1, n2) {
    for (let i = Math.min(n1, n2); i > 0; i--) {
        if (n1 % i == 0 && n2 % i == 0) {
            return i;
        }
    }
    return 1;
}

console.log(gcd(9, 12))