import React from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  BookOutlined,
  FileDoneOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content, Header } = Layout;

const InnerLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "policies":
        navigate("/policies");
        break;
      case "claims":
        navigate("/claims");
        break;
      case "payments":
        navigate("/payments");
        break;
      case "signout":
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme='light'
        breakpoint='lg'
        collapsedWidth='0'
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className='logo' />
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={["policies"]}
          onClick={handleMenuClick}
        >
          <Menu.Item key='policies' icon={<BookOutlined />}>
            Policies
          </Menu.Item>
          <Menu.Item key='claims' icon={<FileDoneOutlined />}>
            Claims
          </Menu.Item>
          <Menu.Item key='payments' icon={<DollarOutlined />}>
            Payments
          </Menu.Item>
          <Menu.Item key='signout' icon={<LogoutOutlined />}>
            Sign Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout' style={{ marginLeft: 200 }}>
        <Header
          className='site-layout-background'
          style={{ padding: 0, textAlign: "right" }}
        >
          <Avatar style={{ backgroundColor: "#87d068", marginRight: "24px" }}>
            U
          </Avatar>
          <span style={{ marginRight: "24px" }}>User Name</span>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, textAlign: "center" }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InnerLayout;
