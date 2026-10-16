// console.log(a)
// var a = 'var Scope';
function demoLetVar() {
    if (true) {
        var a = 'var Scope';
        let b = 'let scope';
    }
    console.log('var a:', a);
    // console.log('var b:', b);
}

demoLetVar();