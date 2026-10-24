const express = require('express');
const app = express();

const pages = {
    '/': '<h1>Home</h1><p>Welcome to our demo site.</p>',
    '/about': '<h1>About</h1><p>We are a teaching demo built with Express.</p>',
    '/contact': '<h1>Contact</h1><p>Email: demo@example.com</p>',
    '/services': '<h1>Services</h1><p>We offer Node labs, JavaScript tutoring, and more.</p>',
    '/faq': '<h1>FAQ</h1><p>Frequently asked questions appear here.</p>',
};

Object.entries(pages).forEach(([routes, html]) => {
    app.get(routes, (req, res) => {
        res.send(html);
    })
})

app.use((req, res) => {
  res.status(404).send('<h1>404 – Page not found</h1>');
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Multi‑page server listening at http://localhost:${PORT}`);
  console.log('Available routes:');
  Object.keys(pages).forEach(r => console.log(`  ${r}`));
});
