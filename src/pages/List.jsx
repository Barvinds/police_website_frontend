import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const List = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newDocument, setNewDocument] = useState({ docType: "", fatherName: "", address: "", photo: "" });

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch documents from the backend
  const fetchDocuments = async () => {
    try {
      const response = await axios.get("https://police-website-frontend-backend.vercel.app/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  // Download PDF
  const downloadPDF = (doc) => {
    const pdf = new jsPDF();
    pdf.text(`Document Type: ${doc.docType}`, 10, 10);
    pdf.text(`Father Name: ${doc.fatherName}`, 10, 20);
    pdf.text(`Address: ${doc.address}`, 10, 30);
    pdf.save(`${doc.docType}.pdf`);
  };

  // Delete document
  const deleteDocument = async (id) => {
    try {
      await axios.delete(`https://police-website-frontend-backend.vercel.app/documents/${id}`);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
      setSelectedDocument(null);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Add new document
  const addDocument = async () => {
    try {
      const response = await axios.post("https://police-website-frontend-backend.vercel.app/documents", newDocument);
      setDocuments([...documents, response.data]);
      setNewDocument({ docType: "", fatherName: "", address: "", photo: "" });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  // Filter documents based on search
  const filteredDocuments = documents.filter((doc) =>
    doc.docType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2 style={{ color: "#fff" }}>Manage Documents</h2>
      <input
        type="text"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchBar}
      />

      <div style={styles.resultsContainer}>
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc._id} style={styles.card}>
              <div style={styles.cardContent}>
                <img src={doc.photo} alt="Document" style={styles.image} />
                <h3>{doc.docType}</h3>
              </div>
              <div>
                <button style={styles.detailsButton} onClick={() => setSelectedDocument(doc)}>Details</button>
                <button style={styles.downloadButton} onClick={() => downloadPDF(doc)}>Download</button>
                <button style={styles.deleteButton} onClick={() => deleteDocument(doc._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noResults}>No matching documents found.</div>
        )}
      </div>

      {/* Modal for details */}
      {selectedDocument && (
        <div style={styles.modal}>
          <h2>{selectedDocument.docType} Details</h2>
          <img src={selectedDocument.photo} alt="Document" style={styles.modalImage} />
          <p>Father Name: {selectedDocument.fatherName}</p>
          <p>Address: {selectedDocument.address}</p>
          <button onClick={() => setSelectedDocument(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", background: "#111827", padding: "40px 20px" },
  searchBar: { width: "80%", padding: "10px", fontSize: "16px", marginBottom: "10px", marginTop: "1rem" },
  addContainer: { display: "flex", flexDirection: "column", gap: "10px", width: "80%", background: "#222", padding: "20px", borderRadius: "8px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  addButton: { padding: "10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  resultsContainer: { display: "flex", flexDirection: "column", gap: "10px", width: "80%" },
  card: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "100%" },
  cardContent: { display: "flex", alignItems: "center", gap: "20px" },
  image: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" },
  detailsButton: { padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "5px" },
  downloadButton: { padding: "8px 16px", background: "#17a2b8", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "5px" },
  deleteButton: { padding: "8px 16px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  noResults: { padding: "8px", textAlign: "center", color: "#888" },
  modal: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" },
  modalImage: { width: "100px", height: "100px", borderRadius: "8px" },
};

export default List;
