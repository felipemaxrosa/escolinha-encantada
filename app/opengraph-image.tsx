import { ImageResponse } from "next/og";

export const alt = "Escolinha Encantada — Creche e Pré-escolar em Coimbra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #fff9f3 0%, #ffe4da 55%, #ebe4fa 100%)",
          color: "#2e2a27",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 34, color: "#ca4622", fontWeight: 700 }}>
          Em Coimbra desde 1994
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 12 }}>
          Escolinha Encantada
        </div>
        <div style={{ fontSize: 36, color: "#6b5e54", marginTop: 20 }}>
          Berçário · Creche · Pré-escolar
        </div>
      </div>
    ),
    size,
  );
}
