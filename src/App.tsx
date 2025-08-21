import "./App.css";

import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { Sprawl } from "./components/Sprawl";

interface ToggleButtonProps {
  label: string;
  onChange: (_: any) => void;
  show: boolean;
}

function ShowToggleButton({ show, label, onChange }: ToggleButtonProps) {
  return (
    <label>
      ( {label}
      <input
        type="checkbox"
        checked={show}
        onChange={onChange}
        className="m-2"
      />
      )
    </label>
  );
}

interface RevealState {
  show: boolean;
  // Call to negate value
  negate: () => void;
}

interface RevealStates {
  sprawlReveal: RevealState;
  oceanReveal: RevealState;
}

function useRevealState(): RevealStates {
  const [showSprawl, setShowSprawl] = useState(false);
  const [showOcean, setShowOcean] = useState(false);

  function negateEnsuringSingleView(label: string) {
    switch (label) {
      case "sprawl":
        if (!showSprawl) {
          setShowOcean(false);
        }
        setShowSprawl(!showSprawl);
        break;
      case "ocean":
        if (!showOcean) {
          setShowSprawl(false);
        }
        setShowOcean(!showOcean);
      default:
    }
  }

  return {
    sprawlReveal: {
      show: showSprawl,
      negate: () => negateEnsuringSingleView("sprawl"),
    },
    oceanReveal: {
      show: showOcean,
      negate: () => negateEnsuringSingleView("ocean"),
    },
  };
}

function App() {
  const { sprawlReveal: sprawl, oceanReveal: ocean } = useRevealState();

  return (
    <div className="flex flex-col items-center">
      <ShowToggleButton
        show={sprawl.show}
        label={"sprawl"}
        onChange={(_) => sprawl.negate()}
      />
      <ShowToggleButton
        show={ocean.show}
        label={"ocean"}
        onChange={(_) => ocean.negate()}
      />
      {sprawl.show && <Sprawl />}
    </div>
  );
}

export default App;
