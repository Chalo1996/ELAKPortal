import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <MenuOutlined
        onClick={showDrawer}
        style={{ fontSize: "24px", cursor: "pointer" }}
      />
      <Drawer
        title='Menu'
        placement='left'
        closable={true}
        onClose={closeDrawer}
        visible={visible}
      >
        <Menu mode='vertical'>
          <Menu.Item key='1'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/about'>About</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/contact'>Contact</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
