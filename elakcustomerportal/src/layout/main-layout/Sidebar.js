import { Menu, Switch, Divider } from "antd";
import {
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  HomeOutlined,
  // GlobalOutlined,
  EllipsisOutlined,
  DownOutlined,
} from "@ant-design/icons";
// import {
//   AccountsIcon,
//   TransactIcon,
//   BorrowIcon,
//   SaveIcon,
//   UmbrellaIcon,
// } from "../icons/icons";
import { useTheme } from "../../store/context/theme-context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import imgLogo from "../../assets/images/Equity_Group_Logo.png";
import darkLogo from "../../assets/images/dark-logo.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/redux/features/authSlice";

const Sidebar = ({ onSelect, collapsed, toggleCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    onSelect(e.key);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/");
  };

  const items = [
    {
      key: collapsed ? "collapsed" : "expanded",
      style: { height: "auto" },
      className: "non-interactive",
      label: (
        <div className="flex items-center">
          {!collapsed && (
            <>
              <img
                src={theme === "dark" ? darkLogo : imgLogo}
                alt="Equity Bank"
                style={{ width: 90, height: 60, marginTop: 20 }}
              />
            </>
          )}
        </div>
      ),
    },
    {
      key: "profile",
      className: "non-interactive",
      style: { height: "auto" },
      label: !collapsed && (
        <div
          className={`${
            theme === "dark" ? "text-white bg-stone-900" : "bg-[#F7F7F7]"
          } flex items-center justify-start pl-1 pr-8 py-3 rounded-lg my-7 mx-0 gap-3`}
        >
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-[#A32A29] text-white flex items-center justify-center rounded-full">
              PN
            </div>
          </div>
          <div className="h-12 text-base">
            <p>
              <span className="font-semibold">Profile Name</span>
              <span className="text-gray-500 text-sm block">Personal</span>
            </p>
          </div>
          <div className="ml-[3px]">
            <DownOutlined className="text-[#A32A29]" />
          </div>
        </div>
      ),
    },
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "divider1",
      width: "auto",
      label: <Divider />,
      className: "non-interactive",
    },
    // {
    //   key: "more",
    //   icon: <EllipsisOutlined className="rotate-90" />,
    //   label: <Link to="/more">More</Link>,
    // },
    // {
    //   key: "accounts",
    //   icon: <AccountsIcon />,
    //   label: <Link to="/accounts">Accounts</Link>,
    // },
    // {
    //   key: "transact",
    //   icon: <TransactIcon />,
    //   label: <Link to="/transact">Transact</Link>,
    // },
    // {
    //   key: "borrow",
    //   icon: <BorrowIcon />,
    //   label: <Link to="/borrow">Borrow</Link>,
    // },
    // {
    //   key: "save",
    //   icon: <SaveIcon />,
    //   label: <Link to="/save">Save</Link>,
    // },
    // {
    //   key: "insure",
    //   icon: <UmbrellaIcon />,
    //   label: <Link to="/insure">Insure</Link>,
    // },
    {
      key: "theme",
      icon: theme === "dark" ? <MoonOutlined /> : <SunOutlined />,
      label: (
        <div className="flex items-center justify-between">
          <span className="mr-2">Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            size="small"
          />
        </div>
      ),
    },
    // {
    //   key: "english",
    //   icon: <GlobalOutlined />,
    //   label: <Link to="/english">English</Link>,
    // },
    {
      key: "signout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      onClick: handleSignOut,
    },
  ];

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={["home"]}
      mode="inline"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
      items={items}
      // theme={theme}
    />
  );
};

export default Sidebar;
