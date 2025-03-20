import React, { useRef, useState } from "react";

const Scan = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recognizedName, setRecognizedName] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);

    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    try {
      const response = await fetch("http://127.0.0.1:5000/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();
      setRecognizedName(data.name);
    } catch (error) {
      console.error("Error sending image to server:", error);
      alert("Failed to recognize face.");
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#111827', // Background color for full page
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };

  const containerStyle = {
    backgroundColor: '#1e293b', // Container color changed
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#f9fafb',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    borderRadius: '9999px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out'
  };

  const startButtonStyle = { ...buttonStyle, backgroundColor: '#3b82f6' };
  const captureButtonStyle = { ...buttonStyle, backgroundColor: '#10b981' };

  const imageStyle = {
    marginTop: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    width: '500px'
  };

  const resultStyle = {
    marginTop: '1rem',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#f9fafb',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Face Recognition System</h1>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '500px', borderRadius: '0.5rem', marginBottom: '1rem' }}></video>
        <canvas ref={canvasRef} width={500} height={300} style={{ display: 'none' }}></canvas>
        <div>
          <button onClick={startCamera} style={startButtonStyle} onMouseOver={e => e.target.style.backgroundColor = '#2563eb'} onMouseOut={e => e.target.style.backgroundColor = '#3b82f6'}>Start Camera</button>
          <button onClick={captureImage} style={captureButtonStyle} onMouseOver={e => e.target.style.backgroundColor = '#059669'} onMouseOut={e => e.target.style.backgroundColor = '#10b981'}>Capture Face</button>
        </div>
        {capturedImage && <img src={capturedImage} alt="Captured" style={imageStyle} />}
        {recognizedName && <h2 style={resultStyle}>Recognized: {recognizedName}</h2>}
      </div>
    </div>
  );
};

export default Scan;
