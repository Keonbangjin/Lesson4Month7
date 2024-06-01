/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// src/AppWithRouterAccess.jsx

import React from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import { ProductList } from './Pages/Products/List';

const AppWithRouterAccess = () => {
  const navigate = useNavigate();
  const onAuthRequired = () => {
    navigate('/login');
  };

  // Directly assigning Okta configuration values
  const baseDomain = 'https://your-okta-domain.okta.com'; // Ensure this is correctly set to your Okta domain
  const issuer = `${baseDomain}/oauth2/default`;
  const clientId = 'your-client-id'; // Ensure this is your actual Okta client ID
  const redirect = 'http://localhost:5173/login/callback'; // Ensure this is your redirect URL

  return (
    <Security 
      issuer={issuer}
      clientId={clientId}
      redirectUri={redirect}
      onAuthRequired={onAuthRequired}
      pkce={true}
    >
      <CssBaseline />
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "products",
            list: "/products",
          },
        ]}
      >
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login baseUrl={baseDomain} issuer={issuer} />} />
          <Route path='/dashboard' element={<SecureRoute><Dashboard /></SecureRoute>} />
          <Route path='/products' element={<ProductList />} />
        </Routes>
      </Refine>
    </Security>
  );
};

export default AppWithRouterAccess;
