function fibonacci(count) {
    if (count <= 1) return count;
    return fibonacci(count - 1) + fibonacci(count - 2);
}

const terms = 6;
for (let i = 0; i <= terms; i++) {
    console.log(fibonacci(i));
}