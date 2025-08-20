import "./App.css";

import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function getWord() {
  const value = Math.random();

  if (value == 0.0) {
    return "super rare";
  }
  if (value <= 0.2) {
    return "pop";
  }
  if (value <= 0.5) {
    return "hi";
  }
  if (value <= 0.8) {
    return "omg";
  }
  return "derp";
}

function WordSprawl() {
  const [magnitude, setMagnitude] = useState(400);

  const container = useRef<HTMLDivElement | null>(null);
  const magnitudeRef = useRef(magnitude);
  const words = useRef<Array<string>>(Array.from({ length: 30 }, getWord));

  useEffect(() => {
    magnitudeRef.current = magnitude;
  }, [magnitude]);

  useGSAP(
    () => {
      container.current
        ?.querySelectorAll<HTMLDivElement>(".box")
        ?.forEach((box) => {
          const animate = () => {
            //console.log(magnitude)
            const magnitude = magnitudeRef.current;
            gsap.to(box, {
              x: (Math.random() * 2 - 1) * magnitude,
              y: (Math.random() * 2 - 1) * magnitude,
              duration: 1 + Math.random() * 2,
              ease: "power2.inOut",
              onComplete: animate, // keep looping
            });
          };

          animate();
        });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <input
        type="range"
        min={0}
        max={1000}
        value={magnitude}
        onChange={(e) => {
          setMagnitude(Number(e.target.value));
        }}
        className="w-64 accent-blue-500 z-50"
      />
      <div className="grid grid-cols-4 gap-4">
        {words.current.map((word, idx) => (
          <div
            key={idx}
            className="box w-20 h-20 flex items-center justify-center rounded-xl font-bold shadow-lg"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordSprawl;
