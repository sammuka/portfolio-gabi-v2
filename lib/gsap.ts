"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

let registered = false;

/**
 * Idempotent GSAP plugin registration.
 *
 * Registers ScrollTrigger (and ScrollSmoother when available) exactly once,
 * on the client. Safe to call multiple times — subsequent calls are no-ops.
 *
 * Note: GSAP's SplitText is a Club GSAP (premium) plugin, so the V2 uses
 * the free `split-type` package as a drop-in alternative. It is re-exported
 * below as `SplitType` / `splitText` helper rather than registered as a
 * GSAP plugin.
 */
export function registerGsap(): void {
  if (registered) return;
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Optional ScrollSmoother — only register if the premium package is present.
  // Wrapped in try/catch so the absence of the module never breaks the app.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const mod = require("gsap/ScrollSmoother");
    if (mod?.ScrollSmoother) {
      gsap.registerPlugin(mod.ScrollSmoother);
    }
  } catch {
    // ScrollSmoother not installed — skip silently.
  }

  // Performance: avoid ScrollTrigger recalculations on mobile URL-bar resizes.
  ScrollTrigger.config({ ignoreMobileResize: true });

  registered = true;
}

/**
 * Thin wrapper around `split-type` so callers don't need to import the lib
 * directly. Mirrors the ergonomics of GSAP's SplitText constructor.
 */
export function splitText(
  target: string | Element | Element[] | NodeListOf<Element>,
  options?: ConstructorParameters<typeof SplitType>[1]
): SplitType {
  return new SplitType(target as ConstructorParameters<typeof SplitType>[0], options);
}

export { gsap, ScrollTrigger, SplitType };
