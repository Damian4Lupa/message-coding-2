import React from "react";

const ResetButton = ({handleReset, resetButtonVisible}) => {
  const resetButton = resetButtonVisible ? (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak2"
        onClick={handleReset}
      >
        Reset
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak2"
        disabled
      >
        Reset
      </button>
    );

  return resetButton;
};

export default ResetButton;
