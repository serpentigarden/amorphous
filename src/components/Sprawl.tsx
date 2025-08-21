import { gsap } from "gsap";
import { useRef, useState, useEffect, type ChangeEvent } from "react";
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

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  setter: (n: number) => void;
}

function SliderInput({ label, min, max, value, setter }: SliderInputProps) {
  return (
    <div className="flex flex-row justify-center">
      <label className="pr-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        className="w-64 accent-blue-500 z-50"
      />
    </div>
  );
}

export function Sprawl() {
  const [magnitude, setMagnitude] = useState(0);
  const magnitudeRef = useRef(magnitude);
  const [speed, setSpeed] = useState(5);
  const speedRef = useRef(speed);

  const container = useRef<HTMLDivElement | null>(null);
  const words = useRef(Array.from({ length: 20 }, getWord));

  useEffect(() => {
    magnitudeRef.current = magnitude;
    speedRef.current = speed;
  }, [magnitude, speed]);

  useGSAP(
    () => {
      container.current
        ?.querySelectorAll<HTMLDivElement>(".box")
        ?.forEach((box) => {
          const animate = () => {
            const speed = speedRef.current;
            const magnitude = magnitudeRef.current;
            gsap.to(box, {
              x: (Math.random() * 2 - 1) * magnitude * 2,
              y: (Math.random() * 2 - 1) * magnitude * 2,
              color: `rgb(${magnitude}, 0, 0)`,
              duration: 0.5 * speed + Math.random(),
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
      <SliderInput
        label="Magnitude"
        min={0}
        max={255}
        value={magnitude}
        setter={setMagnitude}
      />
      <SliderInput
        label="Speed"
        min={1}
        max={5}
        value={speed}
        setter={setSpeed}
      />
      <div className="grid grid-cols-4 gap-4">
        {words.current.map((word, idx) => (
          <div
            key={idx}
            className="box w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-lg"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
