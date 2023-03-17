import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../Css/SideBar/sidebar.css";
import conser from "../../Assets/Images/conservatoire.jpg";
import { SiGoogleclassroom } from "react-icons/si";
import { GiMusicalScore } from "react-icons/gi";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  return (
    <>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {showSidebar ? <FaTimes /> : <FaBars />}
      </div>
      <aside className={`sidebar ${showSidebar ? "show-sidebar" : ""}`}>
        <img src={conser} alt="conservatoire" className="conservatoire" />
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <SiGoogleclassroom className="classroom" />
            <Link to="/" onClick={toggleSidebar}>
              Classes
            </Link>
          </li>
          {/* <li className="sidebar-menu-item">
            <div className="sidebar-menu-link" onClick={toggleServices}>
              <span>Services</span>
              <div className="sidebar-menu-icon">
                {showServices ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {/* <ul className={`sidebar-submenu ${showServices ? 'show-submenu' : ''}`}> */}
          {/* <li>
                <Link to="/service1" onClick={toggleSidebar}>
                  Service 1
                </Link>
              </li>
              <li>
                <Link to="/service2" onClick={toggleSidebar}>
                  Service 2
                </Link>
              </li>
              <li>
                <Link to="/service3" onClick={toggleSidebar}>
                  Service 3
                </Link>
              </li>
            </ul> */}
          {/* </li> */}
          <li className="sidebar-menu-item">
            <GiMusicalScore className="score" />
            <Link to="/about" onClick={toggleSidebar}>
              Scores Library
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/contact" onClick={toggleSidebar}>
              Contact
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
