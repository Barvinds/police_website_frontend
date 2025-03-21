import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const documentSchema = new mongoose.Schema({
  docType: String,
  fields: { fatherName: String, address: String },
  photo: String,
});

const Document = mongoose.model('Document', documentSchema);

// Fetch all documents
app.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload a new document
app.post('/upload', async (req, res) => {
  try {
    const { docType, fields, photo } = req.body;
    const newDocument = new Document({ docType, fields, photo });
    await newDocument.save();
    res.status(201).json({ message: "Document saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a document
app.delete("/documents/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Check if password is correct (store securely in .env)
    if (password !== process.env.DELETE_PASSWORD) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const deletedDoc = await Document.findByIdAndDelete(id);
    if (!deletedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});