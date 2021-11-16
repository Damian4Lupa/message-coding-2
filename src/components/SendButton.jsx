import React from "react";

const SendButton = ({ handleSend }) => {
  return (
    <button
      className="btn btn-outline-primary btnBreak3"
      type="submit"
      value="Send"
      onClick={handleSend}
    >
      Send
    </button>
  );
};

export default SendButton;
