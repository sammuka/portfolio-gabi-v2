import { ImageResponse } from "next/og";

// Favicon dinâmico Cold Archive — 32x32, fundo carbono, "GG" em azul royal.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0C",
          color: "#3B7CDE",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        GG
      </div>
    ),
    { ...size }
  );
}
