function factors(num) {
    const n = Math.abs(Math.floor(num));
    const res = [];

    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            res.push(i);
        }
    }

    return res.sort((a, b) => a - b);

}

const n = 4;
console.log(factors(n))