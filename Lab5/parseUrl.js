const { URL } = require('url');

const raw = 'https://example.com:8080/path/to/page?search=term&lang=en#section';

const myUrl = new URL(raw);

console.log('Protocol :', myUrl.protocol);    
console.log('Hostname :', myUrl.hostname);     
console.log('Port :', myUrl.port);          
console.log('Pathname :', myUrl.pathname);      
console.log('Search (query) :', myUrl.search);  
console.log('Query params:');
myUrl.searchParams.forEach((value, key) => {
  console.log(`${key} = ${value}`);
});
