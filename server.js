import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mongomongo346:j5Qq4bxawoUG5h57@documentlist.cr27r.mongodb.net/?retryWrites=true&w=majority', {
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
app.delete('/delete/:id', async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
