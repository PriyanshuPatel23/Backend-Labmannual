function factorial(n) {
    if (n < 0) return undefined;
    if(n === 0 || n === 1) return 1;
    return n * factorial(n-1); 
}

const n = 5;
const res = factorial(n);
console.log(res);