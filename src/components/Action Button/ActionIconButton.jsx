function ActionIconButton({ buttonClass, iconClass, eventHandler }) {
  return (
    <>
      <button className={buttonClass} onClick={eventHandler}>
        <i className={iconClass}></i>
      </button>
    </>
  );
}

export default ActionIconButton;
