// SiteHeader.jsx
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Layout, Menu } from 'antd';
import './SiteHeader.css';

const { Header } = Layout;

const SiteHeader = ({ selectedKey }) => {
  const { authState, authService } = useOktaAuth();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Header className="site-header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]}>
        {authState.isAuthenticated ? (
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
        ) : (
          <Menu.Item key="home"><a href="/">Home</a></Menu.Item>
        )}
        {authState.isAuthenticated && (
          <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default SiteHeader;
