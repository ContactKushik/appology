export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer re_S1mHsP6J_NkMjtmKgocQaaqqzvZDw4Bur`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Apology Page <onboarding@resend.dev>",
        to: ["contactkushik@gmail.com"], // ⚠️ REPLACE WITH YOUR ACTUAL EMAIL
        subject: "💙 Anushka Accepted Your Apology!",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #ffe4e6, #ffccd5); border-radius: 10px;">
            <h2 style="color: #ec4899; font-family: 'Pacifico', cursive;">Great News!</h2>
            <p style="font-size: 16px; color: #581c87; line-height: 1.6;">
              ${message}
            </p>
            <p style="font-size: 14px; color: #581c87; margin-top: 20px;">
              Anushka visited your apology page and clicked the accept button. ✨
            </p>
            <p style="font-size: 14px; color: #581c87; margin-top: 10px;">
              Timestamp: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      console.error("Resend API error:", data);
      return res
        .status(500)
        .json({ error: "Failed to send email", details: data });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
