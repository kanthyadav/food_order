import React, { useState } from "react";
import axios from "axios";

function AIAssistant() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) {
      alert("Please enter a question");
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        "https://food-order-eyxp.onrender.com/api/ai/food-assistant",
        {
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-page">
      <div className="ai-container">
        <h2 className="ai-title">
          AI Food Assistant 
        </h2>

        <p className="ai-subtitle">
          Ask for food recommendations,
          budget meals, veg/non-veg
          options, restaurants and more.
        </p>

        <div className="ai-search-box">
          <input
            className="ai-input"
            type="text"
            placeholder="Example: Best food under ₹200"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          />

          <button
            className="ai-btn"
            onClick={askAI}
            disabled={loading}
          >
            {loading
              ? "Thinking..."
              : "Ask AI"}
          </button>
        </div>

        <div className="ai-answer-box">
          {answer ? (
            <pre className="ai-answer">
              {answer}
            </pre>
          ) : (
            <p className="ai-placeholder">
              AI responses will appear here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;