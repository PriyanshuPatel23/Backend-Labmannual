function primeRange(low, high) {
    const list = [];
    for (let i = low; i <= high; i++) {
        if (isPrime(i)) {
            list.push(i);
        }
    }
    return list;
}

function isPrime(n) {
    n = Math.abs(Math.floor(n));
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

console.log(primeRange(5, 8));
