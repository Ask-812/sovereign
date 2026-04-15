import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sovereign — One person. Full company. Zero overhead.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.15), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.02em",
            }}
          >
            Sovereign
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            One person.
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #f0f0f0, #a78bfa, #818cf8)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Full company.
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Zero overhead.
          </span>
        </div>

        <p
          style={{
            fontSize: "22px",
            color: "#a1a1aa",
            marginTop: "32px",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          The operating system for independent operators.
        </p>
      </div>
    ),
    { ...size }
  );
}
