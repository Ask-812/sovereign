export async function sendWelcomeEmail(email: string, position: number) {
  if (!process.env.RESEND_API_KEY) return; // Skip if not configured

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Sovereign <onboarding@resend.dev>",
      to: email,
      subject: `You're #${position} on the Sovereign waitlist`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#09090b;color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    
    <div style="text-align:center;margin-bottom:40px;">
      <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#8b5cf6,#6366f1);line-height:40px;text-align:center;color:white;font-weight:bold;font-size:18px;">S</div>
    </div>

    <h1 style="font-size:28px;font-weight:700;text-align:center;margin:0 0 8px;color:#fafafa;">
      You're in. #${position} on the list.
    </h1>
    
    <p style="text-align:center;color:#a1a1aa;font-size:16px;margin:0 0 32px;line-height:1.6;">
      Welcome to Sovereign. You're one of the first operators building the future of independent work.
    </p>

    <div style="background:#18181b;border:1px solid #27272a;border-radius:12px;padding:24px;margin-bottom:32px;">
      <h2 style="font-size:16px;font-weight:600;color:#fafafa;margin:0 0 16px;">What happens next:</h2>
      <div style="margin-bottom:12px;">
        <span style="color:#8b5cf6;font-weight:600;">1.</span>
        <span style="color:#d4d4d8;margin-left:8px;">We're building Sovereign right now. Early access launches Q3 2026.</span>
      </div>
      <div style="margin-bottom:12px;">
        <span style="color:#8b5cf6;font-weight:600;">2.</span>
        <span style="color:#d4d4d8;margin-left:8px;">As a founding member, you'll shape the product and lock in lifetime pricing.</span>
      </div>
      <div>
        <span style="color:#8b5cf6;font-weight:600;">3.</span>
        <span style="color:#d4d4d8;margin-left:8px;">We'll email you with updates — no spam, just milestones.</span>
      </div>
    </div>

    <div style="text-align:center;margin-bottom:32px;">
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 12px;">Know another independent operator who'd want this?</p>
      <a href="https://startup-ten-cyan.vercel.app/?ref=email" style="display:inline-block;background:#8b5cf6;color:white;text-decoration:none;padding:12px 32px;border-radius:999px;font-size:14px;font-weight:600;">Share Sovereign</a>
    </div>

    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://startup-ten-cyan.vercel.app/manifesto" style="color:#8b5cf6;font-size:14px;text-decoration:underline;">Read the Manifesto: "The company is becoming optional"</a>
    </div>

    <hr style="border:none;border-top:1px solid #27272a;margin:32px 0;">

    <p style="text-align:center;color:#52525b;font-size:12px;margin:0;">
      Sovereign — The operating system for independent operators.<br>
      One person. Full company. Zero overhead.
    </p>
  </div>
</body>
</html>`,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
}
