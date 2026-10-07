"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ScaleToFit.module.css";

type Props = {
  /** Design width of the content, in px. */
  width: number;
  /** Design height of the content, in px. */
  height: number;
  /** Never scale above this factor. */
  maxScale?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Renders fixed-size, pixel-accurate content (like the phone mockups) and
 * scales it down uniformly to fit the available width.
 */
export default function ScaleToFit({ width, height, maxScale = 1, className, children }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(maxScale, el.clientWidth / width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, maxScale]);

  return (
    <div
      ref={outerRef}
      className={`${styles.outer} ${className ?? ""}`}
      style={{ maxWidth: width * maxScale, aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={styles.inner}
        style={{
          width,
          height,
          transform: `scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
