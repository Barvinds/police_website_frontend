import React from "react";

const Home = () => {
  const styles = {
    homeSection: {
      position: "relative",
      width: "100%",
      height: "100vh",
      backgroundImage: "url('bg2.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)", // Transparent black overlay
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px",
    },
    content: {
      color: "white",
      maxWidth: "600px",
      padding: "20px",
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "10px",
    },
    paragraph: {
      fontSize: "1.2rem",
    },
    videoLogo: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "80px",
      height: "80px",
    },
    video: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
    },
    // Responsive styles
    "@media (max-width: 768px)": {
      homeSection: {
        height: "100vh",
      },
      heading: {
        fontSize: "2rem",
      },
      paragraph: {
        fontSize: "1rem",
      },
      videoLogo: {
        width: "60px",
        height: "60px",
        bottom: "10px",
        left: "10px",
      },
    },
  };

  return (
    <section id="home" style={styles.homeSection}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.heading}>Welcome to Our Platform</h1>
          <p style={styles.paragraph}>Discover amazing experiences with us.</p>
        </div>
        <div style={styles.videoLogo}>
          <video autoPlay loop muted style={styles.video}>
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Home;
