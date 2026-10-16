const nums = [1, 2, 3];
const more = [...nums];
console.log(more);

const user = { id: 1, name: 'BOB' };
const admin = { ...user, role: 'admin' };
console.log(admin)