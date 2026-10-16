const { URL } = require('url');

const base = new URL('https://myexample.com');

base.pathname = '/v1/users';

base.searchParams.append('page', '2');
base.searchParams.append('limit', '25');

console.log('Final URL:', base.toString());