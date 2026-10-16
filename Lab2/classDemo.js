class Shape {
    constructor(name) {
        this.name = name;
    }
    describe() {
        console.log(`This is a ${this.name}`)
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
}

const c = new Circle(5);
c.describe();

console.log('Area:', c.area().toFixed(2))