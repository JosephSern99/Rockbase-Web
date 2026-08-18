import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

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
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#020617",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#0EA5E9",
              color: "#020617",
              fontSize: 36,
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            R
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#F8FAFC", fontFamily: "sans-serif" }}>
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#F8FAFC",
            fontFamily: "sans-serif",
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          Web development, mobile apps, and robotic process automation
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            width: 120,
            height: 6,
            borderRadius: 3,
            background: "#0EA5E9",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
