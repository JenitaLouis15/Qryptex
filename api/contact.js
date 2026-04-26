export const config = {
  runtime: "edge", // optional (can remove if issues)
};

const ipMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  if (!ipMap.has(ip)) {
    ipMap.set(ip, []);
  }

  const timestamps = ipMap.get(ip).filter(ts => now - ts < windowMs);
  timestamps.push(now);
  ipMap.set(ip, timestamps);

  return timestamps.length > maxRequests;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    const body = await req.json();

    const {
      name,
      email,
      company,
      type,
      budget,
      message,
      website, 
      token 
    } = body;

    if (website) {
      return new Response(JSON.stringify({ error: "Bot detected" }), {
        status: 400,
      });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }


    const ip =
      req.headers.get("x-forwarded-for") || "unknown";

    if (rateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
      });
    }

    if (process.env.TURNSTILE_SECRET_KEY && token) {
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
        }
      );

      const data = await verify.json();

      if (!data.success) {
        return new Response(JSON.stringify({ error: "Captcha failed" }), {
          status: 400,
        });
      }
    }


    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "QRYPTEX <noreply@qryptex.in>",
        to: ["team@qryptex.in"],
        subject: `New Contact from ${name}`,
        html: `
          <h2>New Contact Request</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company || "-"}</p>
          <p><b>Type:</b> ${type || "-"}</p>
          <p><b>Budget:</b> ${budget || "-"}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      }),
    });

    if (!resendRes.ok) {
      return new Response(JSON.stringify({ error: "Email failed" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}