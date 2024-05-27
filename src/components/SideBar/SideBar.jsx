import AccountDetails from "../AccountDetails/AccountDetails";
import ActionIconButton from "../Action Button/ActionIconButton";
import MyProjectsTile from "../MyProjectsTile/MyProjectsTile";
import SideBarTile from "../SidebarTile/SideBarTile";

function SideBar() {
  return (
    <>
      <div className="sidebar" style={{ paddingTop: "10px" }}>
        <AccountDetails />
        <SideBarTile
          buttonName="Today"
          iconClassName="fa-solid fa-calendar-day"
        />
        <SideBarTile
          buttonName="Upcoming"
          iconClassName="fa-regular fa-calendar-days"
        />
        <MyProjectsTile />
      </div>
    </>
  );
}

export default SideBar;
