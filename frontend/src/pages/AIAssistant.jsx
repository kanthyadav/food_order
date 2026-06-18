import React, { useState } from "react";
import axios from "axios";

function AIAssistant() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://food-order-eyxp.onrender.com/api/ai/food-assistant",
        {
          query
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAnswer(res.data.answer);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "AI Request Failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>AI Food Assistant 🍔</h2>

      <input
        type="text"
        placeholder="Ask something..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        style={{
          width: "300px",
          padding: "10px"
        }}
      />

      <button
        onClick={askAI}
        style={{
          marginLeft: "10px"
        }}
      >
        Ask AI
      </button>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          padding: "15px"
        }}
      >
        {answer}
      </div>

    </div>
  );
}

export default AIAssistant;