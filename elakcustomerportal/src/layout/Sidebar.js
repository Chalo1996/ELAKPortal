import { Menu, Switch, Button } from "antd";
import {
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  HomeOutlined,
  GlobalOutlined,
  EllipsisOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useTheme } from "../store/context/theme-context";
import imgLogo from "../assets/Equity_Group_Logo.png";
import profileImg from "../assets/profile.png";
import { useState } from "react";

const { SubMenu } = Menu;

const Sidebar = ({ onSelect }) => {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (e) => {
    onSelect(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: "profile",
      selectable: false,
      label: (
        <div className='mt-7 flex w-full items-center justify-start'>
          <div>
            <img
              src={profileImg}
              alt='Profile'
              className='border-red-500 w-12 h-12 rounded-full'
            />
          </div>
          <div className='ml-5'>
            <p className='font-bold'>John Doe</p>
            <p style={{ fontSize: 12, color: "#888" }}>Professional Title</p>
          </div>
        </div>
      ),
    },
    {
      key: "home",
      selectable: true,
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "space",
      label: "",
    },
    {
      key: "divider1",
      divider: true,
    },
    {
      key: "more",
      selectable: true,
      icon: <EllipsisOutlined />,
      label: "More",
    },
    {
      key: "theme",
      selectable: true,
      icon: theme === "dark" ? <MoonOutlined /> : <SunOutlined />,
      label: (
        <div className='flex items-center justify-between'>
          <span className='mr-2'>Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            size='small'
          />
        </div>
      ),
    },
    {
      key: "english",
      selectable: true,
      icon: <GlobalOutlined />,
      label: "English",
    },
    {
      key: "signout",
      selectable: true,
      icon: <LogoutOutlined />,
      label: "Sign Out",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <Button
          type='text'
          onClick={toggleCollapsed}
          style={{ marginRight: "10px" }}
          icon={<MenuOutlined />}
        />
        <img
          src={imgLogo}
          alt='Equity Bank'
          style={{ width: 90, height: 60 }}
        />
      </div>
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={["home"]}
        mode='inline'
        theme={theme}
        inlineCollapsed={collapsed}
      >
        {items.map((item) => {
          if (item.children) {
            return (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </SubMenu>
            );
          } else if (item.divider) {
            return <Menu.Divider key={item.key} />;
          } else {
            return (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                disabled={!item.selectable}
              >
                {item.label}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </div>
  );
};

export default Sidebar;
