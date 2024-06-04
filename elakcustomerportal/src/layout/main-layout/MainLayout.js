import { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import ContentTrial from "./ContentTrial";

const { Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("home");

  const handleMenuSelect = (key) => {
    if (key === "theme" || key === "expanded" || key === "collapsed") return;
    setSelectedKey(key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider>
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={256}
        collapsedWidth={80}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          margin: 0,
        }}
      >
        <Sidebar
          onSelect={handleMenuSelect}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 256,
        }}
      >
        <Content
          style={{
            overflow: "initial",
          }}
        >
          <ContentTrial selectedKey={selectedKey} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
