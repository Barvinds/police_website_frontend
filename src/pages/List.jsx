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
      const response = await axios.get("http://localhost:5000/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  // Download PDF
  const downloadPDF = (doc) => {
    const pdf = new jsPDF();
  
    // Add logo at the top center
    const logoUrl = "tamilnadu-police-logo.png"; // Update with your logo path
    pdf.addImage(logoUrl, "PNG", 75, 10, 50, 20); // Centered at top
  
    // Add photo on the left side
    const photoUrl = doc.photo;
    pdf.addImage(photoUrl, "JPEG", 10, 40, 40, 40); // Left side
  
    // Add name on the right side of the photo
    pdf.setFontSize(14);
    pdf.text(`Document Type: ${doc.docType}`, 60, 50);
    pdf.text(`Name: ${doc.name}`, 60, 60);
    pdf.text(`Complaint Details: ${doc.complaint}`, 60, 70);
  
    // Additional details below
    pdf.text("Additional Information:", 10, 90);
    pdf.text("This document contains confidential information.", 10, 100);
  
    // Signature section at the bottom
    pdf.line(10, 140, 80, 140); // Signature line
    pdf.text("Signature", 10, 150);
  
    // Save the PDF
    pdf.save(`${doc.docType}.pdf`);
  };

  // Delete document
  const deleteDocument = async (id) => {
    const password = prompt("Enter password to delete:");
    if (!password) return alert("Password is required!");
  
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/documents/${id}`, {
          data: { password },
        });
  
        alert(response.data.message);
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
        setSelectedDocument(null);
      } catch (error) {
        console.error("Error deleting document:", error);
        alert(error.response?.data?.message || "Failed to delete the document.");
      }
    }
  };

  // Add new document
  const addDocument = async () => {
    try {
      const response = await axios.post("http://localhost:5000/documents", newDocument);
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
    <p>Name: {selectedDocument.name}</p>
    <p>Complaint Details: {selectedDocument.complaint}</p>
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
