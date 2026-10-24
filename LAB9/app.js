const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/college_demo';

mongoose.connect(DB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Connection error:", err));

// PART A
const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
})

// PART B
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: Number, required: true, unique: true },
    course: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// PART C
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Faculty = mongoose.model('Faculty', facultySchema);
const Student = mongoose.model('Student', studentSchema);
const Product = mongoose.model('Product', productSchema);

// PART A
async function runDemo() {

    const prof = await Faculty.create({
        name: 'Priyanshu Patel',
        department: 'Computer Science',
        email: 'priyanshu.patel@darshan.ac.in',
    });

    const stud = await Student.create({
        name: 'Anita Sharma',
        rollNo: 2023101,
        course: 'B.Tech',
        email: 'anita.sharma@college.edu',
    });

    const prod = await Product.create({
        name: 'Wireless Mouse',
        price: 29.99,
        inStock: true,
    });

    console.log('Faculty:', prof);
    console.log('Student:', stud);
    console.log('Product:', prod);

    const allFaculties = await Faculty.find();
    const oneStudent = await Student.findOne({ rollNo: 2023101 });
    const cheapProducts = await Product.find({ price: { $lt: 50 } });

    console.log('All faculties:', allFaculties);
    console.log('Student with rollNo 2023101:', oneStudent);
    console.log('Products cheaper than $50:', cheapProducts);

    const updatedProf = await Faculty.findOneAndUpdate(
        { email: 'priyanshu.patel@darshan.ac.in' },
        { department: 'Information Technology' },
        { new: true }
    );

    console.log('Faculty after update:', updatedProf);

    const delResult = await Product.deleteOne({ name: 'Wireless Mouse' });
    console.log('Deleted product count:', delResult.deletedCount);
    
    await mongoose.connection.close();
    console.log('Demo finished, connection closed.');
}

runDemo();