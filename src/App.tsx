import "./App.css";

import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef<HTMLDivElement | null>(null);

  const items = Array.from(
    { length: Math.floor(Math.random() * 10) + 5 },
    () => (Math.random() > 0.5 ? "lol" : "omg"),
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      if (!container.current) {
        return;
      }
      container.current.querySelectorAll(".box").forEach(box => {
        tl.to(
          box,
          {
            x: () => Math.random() * window.innerWidth - 100,
            y: () => Math.random() * window.innerHeight - 100,
            duration: 2 + Math.random() * 2,
            ease: "power2.inOut",
          },
          0,
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="w-full h-screen bg-gray-100 relative overflow-hidden"
    >
      {items.map((text, idx) => (
        <div
          key={idx}
          className="box absolute w-20 h-20 flex items-center justify-center rounded-xl bg-blue-400 text-white font-bold shadow-lg"
        >
          {text}
        </div>
      ))}
    </div>
  );
}

export default App;
