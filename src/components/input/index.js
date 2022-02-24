import { useState } from "react";

const InputComponent = ({ success, secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  if (success) {
    return <div data-test="component-input-2"></div>;
  } else {
    return (
      <div data-test="component-input">
        <form className="form-inline">
          <input
            data-test="input-box"
            type="text"
            placeholder="enter guess"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentGuess("");
            }}
            data-test="submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
};
export default InputComponent;
