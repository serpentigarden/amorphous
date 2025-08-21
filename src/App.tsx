import "./App.css";

import { useState } from "react";
import { Sprawl } from "./components/Sprawl";
import { Scene as OceanScene } from "./components/Ocean";

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
  const { sprawlReveal, oceanReveal } = useRevealState();

  return (
    <div className="size-100 flex flex-col items-center">
      <ShowToggleButton
        show={sprawlReveal.show}
        label={"sprawl"}
        onChange={(_) => sprawlReveal.negate()}
      />
      <ShowToggleButton
        show={oceanReveal.show}
        label={"ocean"}
        onChange={(_) => oceanReveal.negate()}
      />
      {sprawlReveal.show && <Sprawl />}
      {oceanReveal.show && <OceanScene />}
    </div>
  );
}

export default App;
