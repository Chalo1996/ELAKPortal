import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from '../main-layout/Sidebar';

const { Content, Sider } = Layout;

const InnerLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout hasSider>
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        collapsedWidth={80}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          margin: 0,
        }}
      >
        <Sidebar
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          type="inner"
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 260,
          overflow: 'auto',
        }}
      >
        <Content
          style={{
            overflow: 'initial',
          }}
        >
          <div className={`min-h-[100vh] p-[24px]`}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InnerLayout;
