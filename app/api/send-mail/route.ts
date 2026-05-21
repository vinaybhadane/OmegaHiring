import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { toEmail, toName, subject, html, text } = await req.json();

    const apiKey = process.env.MAILJET_API_KEY;
    const secretKey = process.env.MAILJET_SECRET_KEY;

    if (!apiKey || !secretKey) {
      return NextResponse.json({ error: "Mailjet keys not configured" }, { status: 500 });
    }

    const auth = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "iamrockerv@gmail.com",
              Name: "Omega Hiring"
            },
            To: [
              {
                Email: toEmail,
                Name: toName || ""
              }
            ],
            Subject: subject,
            TextPart: text,
            HTMLPart: html
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Mailjet API Error:", data);
      return NextResponse.json({ error: "Failed to send email", details: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
