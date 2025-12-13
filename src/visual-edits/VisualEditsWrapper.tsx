"use client";

import dynamic from "next/dynamic";

const VisualEditsMessenger = dynamic(
  () => import("./VisualEditsMessenger"),
  { ssr: false }
);

export default function VisualEditsWrapper() {
  return <VisualEditsMessenger />;
}

