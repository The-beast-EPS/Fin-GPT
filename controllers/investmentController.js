// Mock investment suggestion logic based on risk level
exports.getSuggestions = async (req, res) => {
  const { risk } = req.query;

  const suggestions = {
    low: [
      { type: "Mutual Fund", name: "ICICI Prudential Balanced Advantage Fund" },
      { type: "FD", name: "HDFC Fixed Deposit - 7.5%" },
    ],
    medium: [
      { type: "Stock", name: "Tata Consultancy Services (TCS)" },
      { type: "ETF", name: "Nifty 50 ETF" },
    ],
    high: [
      { type: "Crypto", name: "Bitcoin" },
      { type: "Stock", name: "Tesla Inc." },
    ],
  };

  res.json({
    profile: risk || "medium",
    suggestions: suggestions[risk] || suggestions["medium"],
  });
};
