import "./App.css";

import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function getWord(): string {
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
  const [magnitude, setMagnitude] = useState(128);

  const container = useRef<HTMLDivElement | null>(null);
  const magnitudeRef = useRef(magnitude);
  const words = useRef(Array.from({ length: 20 }, getWord));

  useEffect(() => {
    magnitudeRef.current = magnitude;
  }, [magnitude]);

  useGSAP(
    () => {
      container.current
        ?.querySelectorAll<HTMLDivElement>(".box")
        ?.forEach((box) => {
          const animate = () => {
            const magnitude = magnitudeRef.current;
            gsap.to(box, {
              x: (Math.random() * 2 - 1) * magnitude * 2,
              y: (Math.random() * 2 - 1) * magnitude * 2,
              color: `rgb(${magnitude / 2}, ${magnitude}, ${magnitude})`,
              duration: 3 + Math.random() * 2,
              ease: "power2.inOut",
              onComplete: animate,
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
        max={255}
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

function App() {
  const [showSprawl, setShowSprawl] = useState(false);
  const [sawOnce, setSawOnce] = useState(false);

  return (
    <div className="flex flex-row items-center">
      {showSprawl ? (
        <>
          Woah <WordSprawl />
        </>
      ) : (
        <div> {sawOnce ? "What was that?" : "Nothing to see here"}</div>
      )}
      <input
        type="checkbox"
        onChange={(_) => {
          setShowSprawl(!showSprawl);
          setSawOnce(true);
        }}
        className="m-8"
      />
    </div>
  );
}

export default App;
