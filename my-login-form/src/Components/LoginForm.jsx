/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { Form, Input, Button, Alert, Row, Col } from 'antd';
import './LoginForm.css'; // Import custom CSS for styling

const LoginForm = ({ baseUrl, issuer }) => {
  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const oktaAuth = new OktaAuth({ url: baseUrl, issuer: issuer });
    oktaAuth
      .signIn({ username, password })
      .then(res => setSessionToken(res.sessionToken))
      .catch(err => setError(err));
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    authService.redirect({ sessionToken });
    return null;
  }

  const errorAlert = error ? (
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Alert message="Authentication Failed" type="warning" />
      </Col>
    </Row>
  ) : null;

  return (
    <Form layout="vertical" className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-title">Login</h1>
      <Form.Item label="Username">
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-button">
          Login
        </Button>
      </Form.Item>
      {errorAlert}
    </Form>
  );
};

export default LoginForm;
