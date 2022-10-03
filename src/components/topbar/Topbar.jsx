import React, { useCallback } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
// import { Menu, MenuItem } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Niraan Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <LogoutIcon onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}
