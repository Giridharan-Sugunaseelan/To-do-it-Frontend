import "./addButton-module.css";
function AddButton({ buttonName, buttonClassName, eventHandler }) {
  return (
    <>
      <div className="addButtonContainer">
        <button className={buttonClassName} onClick={eventHandler}>
          <i className="fa-solid fa-plus" style={{ color: "#de4d4b" }}></i>
          {`  ${buttonName}`}
        </button>
      </div>
    </>
  );
}

export default AddButton;
