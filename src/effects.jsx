import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(function subscribe() {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function update() {
      setReduced(media.matches);
    }
    update();
    media.addEventListener("change", update);
    return function unsubscribe() {
      media.removeEventListener("change", update);
    };
  }, []);
  return reduced;
}

export function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useScrollReveal() {
  useEffect(function observe() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(markVisible);
      return undefined;
    }
    const observer = new IntersectionObserver(handleEntries, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    function handleEntries(entries) {
      entries.forEach(function reveal(entry) {
        if (entry.isIntersecting) {
          markVisible(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    nodes.forEach(function watch(node) {
      observer.observe(node);
    });
    return function disconnect() {
      observer.disconnect();
    };
  }, []);
}

function markVisible(node) {
  node.classList.add("is-visible");
}

export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(function track() {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${ratio})`;
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return function cleanup() {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}

export function TiltCard({ as: Tag = "div", className = "", max = 10, children, ...rest }) {
  const ref = useRef(null);

  function handleMove(event) {
    if (event.pointerType !== "mouse" || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    ref.current.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
    ref.current.style.setProperty("--ry", `${(px - 0.5) * max * 1.2}deg`);
    ref.current.style.setProperty("--gx", `${px * 100}%`);
    ref.current.style.setProperty("--gy", `${py * 100}%`);
  }

  function handleLeave() {
    if (!ref.current) {
      return;
    }
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  }

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave} {...rest}>
      {children}
    </Tag>
  );
}
