import React from "react";
import Drawer from "@mui/material/Drawer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
const SideBarDrawer = ({ drawerOpen, handleMenuToggle }) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => handleMenuToggle(false)}
        className="drawerrrr"
      >
        <div style={{ width: "250px" }} className="drawer">
          <SideBar closeDrawer={handleMenuToggle}/>
        </div>
      </Drawer>
    </>
  );
};

export default SideBarDrawer;
