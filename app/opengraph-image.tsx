import { ImageResponse } from "next/og";

export const alt = "Gabriella Gonçalves — UX/UI Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0A0A0C",
          color: "#EDEDED",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#808080",
          }}
        >
          <span>GG — Portfolio</span>
          <span style={{ color: "#3B7CDE" }}>Cold Archive</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 600,
              color: "#EDEDED",
              maxWidth: 980,
            }}
          >
            Gabriella Gonçalves
          </div>
          <div
            style={{
              fontSize: 40,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              fontWeight: 500,
              color: "#3B7CDE",
            }}
          >
            UX/UI Designer — interfaces claras, consistentes e intencionais.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#808080",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>Dois Vizinhos — PR / Brasil</span>
          <span>gabriellagoncalves.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
