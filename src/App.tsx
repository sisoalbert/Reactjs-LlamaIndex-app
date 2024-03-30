import "./App.css";
import React, { useState } from "react";

const QuerySender: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAnswer("Thinking...");
    try {
      const response = await fetch("http://localhost:3000/query", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log("Response from the server:", data);
      setAnswer(data.response);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Error: " + error);
      setQuery("");
    }
  };

  // Function to update the state with the input value
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#333" }}>Ask a question</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="query"
          type="text"
          value={query}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Query
        </button>
      </form>
      <div id="answer" style={{ marginTop: "20px" }}>
        {answer}
      </div>
    </div>
  );
};

export default QuerySender;
