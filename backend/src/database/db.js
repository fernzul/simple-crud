import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27018/simple-crud')
    .then(() => ('Database connected successfully!'))
    .catch((error) => console.error('Database connection error:', error));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error: '));