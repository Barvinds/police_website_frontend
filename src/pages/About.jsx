import React, { useState } from "react";

const About = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
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
      marginTop: "4rem", // Added top margin
    },
    card: {
      width: "100%",
      maxWidth: "800px",
      background: "white",
      padding: "25px",
      marginBottom: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardHover: {
      transform: "scale(1.03)",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
    },
    heading: {
      color: "#333",
      marginBottom: "12px",
      fontSize: "24px",
      fontWeight: "600",
    },
    text: {
      color: "#555",
      lineHeight: "1.6",
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      resize: "none",
      fontSize: "14px",
    },
    button: {
      display: "inline-block",
      width: "100%",
      padding: "12px",
      marginTop: "12px",
      background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
      color: "black",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background 0.3s ease, transform 0.2s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
      background: "linear-gradient(135deg, #e53855, #d03028)",
    },
  };

  return (
    <div style={styles.page}>
      {/* About Section */}
      <div
        style={styles.card}
        onMouseOver={(e) => Object.assign(e.target.style, styles.cardHover)}
        onMouseOut={(e) => Object.assign(e.target.style, styles.card)}
      >
        <h2 style={styles.heading}>About Us</h2>
        <p style={styles.text}>
          We are dedicated to providing innovative solutions that enhance user experience.
          Our mission is to make technology more accessible and intuitive.
        </p>
      </div>

      {/* Feedback Section */}
      <div
        style={styles.card}
        onMouseOver={(e) => Object.assign(e.target.style, styles.cardHover)}
        onMouseOut={(e) => Object.assign(e.target.style, styles.card)}
      >
        <h2 style={styles.heading}>Give Your Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            style={styles.textarea}
            placeholder="Write your feedback..."
            value={feedback}
            onChange={handleFeedbackChange}
            required
          ></textarea>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Contact Section */}
      <div
        style={styles.card}
        onMouseOver={(e) => Object.assign(e.target.style, styles.cardHover)}
        onMouseOut={(e) => Object.assign(e.target.style, styles.card)}
      >
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.text}>📍 Location: 123 Tech Street, Innovation City</p>
        <p style={styles.text}>📞 Phone: +123 456 7890</p>
        <p style={styles.text}>✉ Email: contact@yourwebsite.com</p>
      </div>
    </div>
  );
};

export default About;
