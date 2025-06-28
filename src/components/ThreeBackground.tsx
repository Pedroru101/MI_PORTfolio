"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load react-three/fiber Canvas only on client
const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => null,
});

export function ThreeBackground() {
  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <Scene />
      </div>
    </Suspense>
  );
}
