function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'Alice' };
        callback(data);
    }, 1000);
}

fetchData(result => {
    console.log("Callback received: ", result);
})