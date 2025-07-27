const axios = require("axios");

exports.chatWithBot = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ msg: "Message is required" });

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma:2b", // This is the model tag in Ollama
      prompt: message,
      stream: false,
    });

    const reply = response.data.response;
    res.json({ reply });
  } catch (err) {
    console.error("Ollama Chatbot Error:", err.message);
    res.status(500).json({ msg: "Gemma failed to respond" });
  }
};
