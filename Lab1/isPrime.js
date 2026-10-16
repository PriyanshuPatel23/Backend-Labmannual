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
const num = 6;
console.log(isPrime(num)) 