import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { FaAdversal, FaHome } from "react-icons/fa";
import { BsTrophyFill } from "react-icons/bs";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#1234" }}>
        &times;
      </span>
      <NavLink tag={Link} to={"/"}>
        <h3>KATI</h3>
      </NavLink>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink
            className="nav_link"
            tag={Link}
            to={"/"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaHome className="nav_menu" size="40" />
            <div className="nav_menu" style={{ marginLeft: "5%" }}>
              HOME
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav_link"
            tag={Link}
            to={"/ad"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaAdversal className="nav_menu" size="40" />
            <div className="nav_menu" style={{ marginLeft: "5%" }}>
              AD
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav_link"
            tag={Link}
            to={"/ranking"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <BsTrophyFill className="nav_menu" size="40" />
            <div className="nav_menu" style={{ marginLeft: "5%" }}>
              RANKING
            </div>
            <div className="navi_point"></div>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className="nav_link"
            tag={Link}
            to={"/test"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <BsTrophyFill className="nav_menu" size="40" />
            <div className="nav_menu" style={{ marginLeft: "5%" }}>
              테스트입니다
            </div>
            <div className="navi_point"></div>
          </NavLink>
        </NavItem> */}
      </Nav>
    </div>
  </div>
);

export default SideBar;
