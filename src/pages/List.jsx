import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const List = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

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

  // Filter documents based on search
  const filteredDocuments = documents.filter((doc) =>
    doc.docType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle document deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Generate and download PDF
  const handleDownload = (doc) => {
    const pdf = new jsPDF();
    pdf.text(`Document Type: ${doc.docType}`, 10, 10);
    pdf.text(`Father Name: ${doc.fields.fatherName}`, 10, 20);
    pdf.text(`Address: ${doc.fields.address}`, 10, 30);
    pdf.save(`${doc.docType}.pdf`);
  };

  return (
    <div style={styles.page}>
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
              <img src={doc.photo} alt="Document" style={styles.image} />
              <h3>{doc.docType}</h3>
              <div style={styles.buttons}>
                <button onClick={() => setSelectedDocument(doc)}>Details</button>
                <button onClick={() => handleDownload(doc)}>Download</button>
                <button onClick={() => handleDelete(doc._id)}>Delete</button>
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
          <p>Father Name: {selectedDocument.fields.fatherName}</p>
          <p>Address: {selectedDocument.fields.address}</p>
          <button onClick={() => setSelectedDocument(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", background: "#111827", padding: "40px 20px"},
  searchBar: { width: "80%", padding: "10px", fontSize: "16px", marginBottom: "10px" ,marginTop:"8rem"},
  resultsContainer: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", width: "80%" },
  card: { background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center", width: "200px" },
  image: { width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" },
  buttons: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" },
  noResults: { padding: "8px", textAlign: "center", color: "#888" },
  modal: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" },
  modalImage: { width: "100px", height: "100px", borderRadius: "8px" },
};

export default List;
