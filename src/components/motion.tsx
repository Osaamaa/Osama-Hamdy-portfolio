"use client";

import { useEffect } from "react";

export function Motion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observed = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const firstObservation = !observed.has(entry.target);
        observed.add(entry.target);
        if (entry.isIntersecting) {
          // Content stays visible by default. Animate only when an offscreen
          // section enters later, without measuring or hiding it during startup.
          if (!firstObservation) entry.target.classList.add("reveal-animate");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.06 });
    elements.forEach(element => observer.observe(element));
    const revealAll = () => { elements.forEach(element => element.classList.remove("reveal-animate")); observer.disconnect(); };
    preference.addEventListener("change", revealAll);
    return () => { revealAll(); preference.removeEventListener("change", revealAll); };
  }, []);
  return null;
}
