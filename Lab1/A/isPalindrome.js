function isPalindrome(num){
    const s = String(Math.abs(num));
    return s === s.split('').reverse().join('');
}

const n = 121;
console.log(isPalindrome(n));