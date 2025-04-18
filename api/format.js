module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  // Formatting logic: Add pauses, emphasis, and naturalness
  let formattedText = text
    .replace(/(\$\d+(?:\.\d+)?)/g, " ... $1 ... ") // Pause around prices (e.g., $99 or $99.00)
    .replace(/,/, " , ") // Ensure space after commas
    .replace(/([.!?])\s/g, "$1 ... ") // Pause after periods, exclamations, and questions
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();

  // Ensure proper pacing for questions like "Does that make sense?"
  if (formattedText.includes("Does that make sense ... ?")) {
    formattedText = formattedText.replace(
      "Does that make sense ... ?",
      "Does ... that make sense ... ?"
    );
  }

  return res.status(200).json({ formattedText });
};
