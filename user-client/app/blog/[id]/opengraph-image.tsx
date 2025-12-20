import { ImageResponse } from "next/og";
import { getPostV1 } from "@/entities/Post";
// import { readFile } from 'node:fs/promises';
// import { join } from 'node:path'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const post = await getPostV1(Number(params.id));
  //   const fontData = await readFile(
  //     join(process.cwd(), 'assets/fonts/RobotoMono.ttf')
  //   )

  return new ImageResponse(
    <div
      style={{
        background: "black",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "200px",
        fontFamily: "monospace",
        fontWeight: "normal",
      }}
    >
      <div style={{ fontSize: 66, lineHeight: 1.2 }}>{post.title}</div>
      <div style={{ fontSize: 42, marginTop: 24 }}>on NikolaiYakunin blog.</div>
    </div>,
  );
}
