import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Avatar } from "flowbite-react";
import { useSignOut } from "react-auth-kit";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import AdminContext from "../../contexts/AdminContext";
import Badge from "../../contexts/BadgeContext";
function BadgeAvatar() {
  const [userEmail, setuserEmail] = useState("");
  const [username, setusername] = useState("");
  useEffect(() => {
    setTimeout(() => {
      const userObject = JSON.parse(window.localStorage.getItem("_auth_state"));
      const { user, username } = userObject;
      setuserEmail(user);
      setusername(username);
    }, 2000);
  }, []);
  const userObject = JSON.parse(window.localStorage.getItem("_auth_state"));
  console.log(userObject);

  const signOut = useSignOut();
  const navigate = useNavigate();
  const { admin, setadmin } = useContext(AdminContext);
  const { setuser } = useContext(UserContext);
  const { badge, setbadge } = useContext(Badge);
  const handleSignOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setadmin(false);
    setuser(false);
    setbadge(false);
    navigate("/");
  };
  return (
    <div className="fixed right-32 top-[13px]">
      <Dropdown
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded={true}
          />
        }
        arrowIcon={false}
        inline={true}
      >
        <Dropdown.Header>
          <span className="block text-sm">{username}</span>
          <span className="block truncate text-sm font-medium">
            {userEmail}
          </span>
        </Dropdown.Header>
        <Dropdown.Item></Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <a href="/" onClick={(e) => handleSignOut(e)}>
            Sign out
          </a>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default BadgeAvatar;
