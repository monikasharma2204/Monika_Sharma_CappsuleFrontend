import React, { useState } from "react";

const ButtonGroup = ({
  title,
  buttons = [],
  onClickButton = () => {},
  selectedName = "",
  unavailable = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const buttonStyle = {
    base: {
      color: "#007bff",
      borderColor: "#007bff",
    },
    selected: {
      boxShadow: "0 0 0 0.15rem rgba(0, 123, 255, 0.5)",
    },
    unavailable: {
      borderStyle: "dashed",
      color: "rgba(0, 123, 255, 0.5)",
    },
    selectedUnavailable: {
      borderColor: "#007bff",
      borderWidth: "2px",
    },
  };

  const renderButtons = () => {
    const renderedButtons = buttons.map((button, index) => (
      <button
        key={index}
        style={{
          ...buttonStyle.base,
          ...(selectedName === button &&
            unavailable.includes(button) &&
            buttonStyle.selectedUnavailable),
          ...(selectedName === button &&
            !unavailable.includes(button) &&
            buttonStyle.selected),
          ...(!unavailable.includes(button) ? {} : buttonStyle.unavailable),
        }}
        className={`btn me-2 mb-2`}
        onClick={() => onClickButton(button)}
        disabled={!button}
      >
        {button}
      </button>
    ));

    if (!showAll) {
      return renderedButtons.slice(0, 4);
    }
    return renderedButtons;
  };

  return (
    <>
      <div className="d-flex" style={{ width: "500px" }}>
        <h6 className="me-2">{title}:</h6>
        <div className="d-flex flex-wrap">
          {renderButtons()}
          {buttons.length > 4 && (
            <button
              className="btn btn-link me-2 mb-2 more-btn fw-bold text-decoration-none"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "...Hide" : "...More"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ButtonGroup;
