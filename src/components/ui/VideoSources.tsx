import type { Clip } from "@/lib/data";

/** Fuentes de un video: WebM (VP9) primero y MP4 (H.264) como respaldo. */
export default function VideoSources({ clip }: { clip: Pick<Clip, "src" | "webm"> }) {
  return (
    <>
      {clip.webm && <source src={clip.webm} type="video/webm" />}
      <source src={clip.src} type="video/mp4" />
    </>
  );
}
