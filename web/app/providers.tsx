"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { MotionConfig } from "motion/react";
import { makeStore } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      {/* reducedMotion="user" makes every motion.* animation site-wide
          respect the OS prefers-reduced-motion setting automatically,
          without each component having to handle it individually. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Provider>
  );
}
