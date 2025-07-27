const { ChatSession } = require("gpt4all");

(async () => {
  const session = new ChatSession();

  await session.open(); // important

  const response = await session.prompt("What is 2 + 2?");
  console.log("RESPONSE:", response);

  await session.close();
})();
