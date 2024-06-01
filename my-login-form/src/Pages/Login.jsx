/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm'
import { useOktaAuth } from '@okta/okta-react';
import SiteHeader from '../Components/SiteHeader';
import SiteFooter from '../Components/SiteFooter';
import { Layout } from 'antd';

const { Content } = Layout;

const Login = ({ baseUrl, issuer }) => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Navigate to={{ pathname: '/Dashboard' }} /> :
    <Layout>
      <SiteHeader selectedKey="login"></SiteHeader>
      <Content style={{ padding: 40 }}>
        <LoginForm baseUrl={baseUrl} issuer={issuer} />
      </Content>

      <SiteFooter></SiteFooter>
    </Layout>
};

export default Login;