import "./App.css";
import { useState } from "react";
export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}
function App() {
  const [backgroundBtn, setBackgroundBtn] = useState("red");
  const [disableBtn, setDisableBtn] = useState(false);
  const handleChangeColor = () => {
    if (backgroundBtn === "red") {
      setBackgroundBtn("blue");
    } else {
      setBackgroundBtn("red");
    }
  };
  const handleCheckbox = (e) => {
    const { checked } = e.target;
    if (checked) {
      setDisableBtn(true);
      setBackgroundBtn("gray");
    } else {
      setDisableBtn(false);
      setBackgroundBtn("blue");
    }
  };
  return (
    <div className="App">
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <button
        disabled={disableBtn}
        onClick={handleChangeColor}
        style={{ backgroundColor: `${backgroundBtn}` }}
      >
        {backgroundBtn === "red" ? "Change to blue" : "Change to red"}
      </button>
      <input
        checked={disableBtn}
        id="disable-button-checkbox"
        onChange={(e) => handleCheckbox(e)}
        type="checkbox"
      />
        <label htmlFor="disable-button-checkbox">{`Disable button "Change to blue"`}</label>
 
    </div>
  );
}

export default App;
