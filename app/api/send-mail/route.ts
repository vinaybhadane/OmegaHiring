import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { toEmail, toName, subject, html, text, fromEmail = "vinay123bhadane@gmail.com", fromName = "Omega Hiring" } = await req.json();

    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Brevo API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: fromName,
          email: fromEmail
        },
        to: [
          {
            email: toEmail,
            name: toName || ""
          }
        ],
        subject: subject,
        htmlContent: html,
        textContent: text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      return NextResponse.json({ error: "Failed to send email", details: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
