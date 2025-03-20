import React, { useState } from "react";
import { jsPDF } from "jspdf";

const DocumentGenerator = () => {
  const [docType, setDocType] = useState("");
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);

  const documentOptions = ["Police FIR", "Petition", "Anticipatory Bail"];

  const fieldSets = {
    "Police FIR": [
      "Father's / Husband's Name",
      "Address",
      "Phone number & Fax",
      "Email",
      "Distance from Police Station",
      "Date and Time of Occurrence",
      "Nature of Offence",
      "Description of Accused",
      "Details of Witnesses",
      "Complaint Details",
    ],
    "Petition": [
      "Father's / Husband's Name",
      "Address",
      "Phone number & Fax",
      "Email",
      "Case Number",
      "Court Name",
      "Lawyer's Name",
      "Petition Details",
      "Supporting Documents",
    ],
    "Anticipatory Bail": [
      "Father's / Husband's Name",
      "Address",
      "Phone number & Fax",
      "Email",
      "Case Number",
      "Court Name",
      "Reason for Anticipatory Bail",
      "Details of Allegations",
      "Lawyer's Name",
      "Supporting Evidence",
    ],
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePDF = () => {
    if (!docType) {
      alert("Please select a document type.");
      return;
    }

    const doc = new jsPDF();
    let yOffset = 20;

    // Add logo
    const logo = new Image();
    logo.src = "/tamilnadu-police-logo.png";
    doc.addImage(logo, "PNG", 80, yOffset, 50, 50);
    yOffset += 60;

    // Add title
    doc.setFontSize(16);
    doc.text(docType, 80, yOffset);
    yOffset += 10;

    // Add uploaded photo
    if (photo) {
      doc.addImage(photo, "JPEG", 10, yOffset, 40, 40);
    } else {
      doc.rect(10, yOffset, 40, 40);
      doc.text("Photo", 20, yOffset + 20);
    }

    // Name field next to the photo
    doc.setFontSize(12);
    doc.text(`Name: ${formData.Name || ""}`, 60, yOffset + 20);
    yOffset += 50;

    // Document details in table format
    doc.setFontSize(12);
    doc.text("Document Details", 80, yOffset - 5);

    let startX = 10;
    let startY = yOffset;
    let colWidth = 90;
    let rowHeight = 10;

    fieldSets[docType].forEach((field, index) => {
      doc.rect(startX, startY + index * rowHeight, colWidth, rowHeight);
      doc.rect(startX + colWidth, startY + index * rowHeight, colWidth, rowHeight);
      doc.text(field, startX + 2, startY + index * rowHeight + 7);
      doc.text(formData[field] || "", startX + colWidth + 2, startY + index * rowHeight + 7);
    });

    let tableEndY = startY + fieldSets[docType].length * rowHeight;

    // Signature
    doc.text("Signature", 80, tableEndY + 20);
    doc.line(60, tableEndY + 25, 140, tableEndY + 25);

    doc.save("document.pdf");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Document Generator</h1>

        <label style={styles.label}>Select Document Type:</label>
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          style={styles.select}
        >
          <option value="">Choose...</option>
          {documentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {docType && (
          <div style={styles.form}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("Name", e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Upload Photo:</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={styles.input} />

            {photo && <img src={photo} alt="Uploaded" style={styles.preview} />}

            {fieldSets[docType].map((field) => (
              <div key={field} style={styles.inputGroup}>
                <label style={styles.label}>{field}:</label>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  style={styles.input}
                />
              </div>
            ))}

            <button onClick={handleGeneratePDF} style={styles.button}>
              Generate PDF
            </button>
          </div>
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
  container: {
    width: "600px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    textAlign: "left",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  form: {
    textAlign: "left",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  preview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginTop: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default DocumentGenerator;
