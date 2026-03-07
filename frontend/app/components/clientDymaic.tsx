'use client'
import dynamic from "next/dynamic";

const LiveProcessingTicker = dynamic(
  () => import("./LiveProcessingTicker"),
  { ssr: false }
);


export { LiveProcessingTicker };
