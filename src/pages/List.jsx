import React, { useState } from "react";

const List = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([
    "Project Report",
    "Meeting Notes",
    "Invoice 2024",
    "Research Paper",
    "AI Documentation",
  ]);

  const filteredDocuments = documents.filter((doc) =>
    doc.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          filteredDocuments.map((doc, index) => (
            <div key={index} style={styles.resultItem}>
              {doc}
            </div>
          ))
        ) : (
          <div style={styles.noResults}>No matching documents found.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#111827",
    padding: "40px 20px",
  },
  searchBar: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  resultsContainer: {
    width: "80%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    minHeight: "100px",
  },
  resultItem: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  noResults: {
    padding: "8px",
    textAlign: "center",
    color: "#888",
  },
};

export default List;
