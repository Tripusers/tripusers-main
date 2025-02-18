import { ImageResponse } from "next/og";
export const runtime = "edge";

// Image metadata
export const alt = "tripusers.com";
export const size = {
  width: 1463,
  height: 430,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <img
        alt="logo"
        src="https://i.postimg.cc/j5h62pZg/tripusers-com-card.png"
      />
    ),
    {
      ...size,
    }
  );
}
