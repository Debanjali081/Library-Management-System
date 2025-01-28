import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  available: { type: Boolean, default: true },
  serialNumber: { type: String, unique: true, required: true },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
