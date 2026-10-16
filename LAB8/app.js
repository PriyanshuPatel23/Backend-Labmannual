const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Hello‑World server listening at http://localhost:${PORT}`)
})