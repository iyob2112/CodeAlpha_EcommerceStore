import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.icon}>✔</div>

        <h1 style={styles.title}>Payment Successful</h1>

        <p style={styles.text}>
          Your payment was completed successfully. Thank you for your order.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4fff6",
  },

  box: {
    textAlign: "center",
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    width: "300px",
  },

  icon: {
    fontSize: "50px",
    color: "green",
    marginBottom: "10px",
  },

  title: {
    fontSize: "22px",
    marginBottom: "10px",
  },

  text: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },

  button: {
    padding: "10px 15px",
    border: "none",
    background: "green",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};