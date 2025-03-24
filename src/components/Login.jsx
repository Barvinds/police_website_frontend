import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4",
        },
        box: {
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "300px",
        },
        input: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
