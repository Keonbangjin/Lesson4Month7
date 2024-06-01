/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SiteHeader from '../Components/SiteHeader';
import SiteFooter from '../Components/SiteFooter';
import { Layout, Menu, Breadcrumb, Row, Col, Table, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Dashboard.css'; // Import custom CSS for styling

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accounts] = useState([
    {
      id: 1,
      name: 'Checking',
      transactions: [
        { id: 1, amount: -100.00, type: 'debit', tags: ['groceries'] },
        { id: 2, amount: 2000.00, type: 'credit', tags: ['payroll'] },
        { id: 3, amount: -50.00, type: 'debit', tags: ['credit card', 'bills'] },
        { id: 4, amount: -300.00, type: 'debit', tags: ['car', 'bills'] },
        { id: 5, amount: -1000.00, type: 'transfer out', tags: ['savings'] },
        { id: 6, amount: -1000.00, type: 'transfer out', tags: ['mm account'] }
      ]
    },
    {
      id: 2,
      name: 'Savings',
      transactions: [
        { id: 1, amount: 1000.00, type: 'transfer in', tags: ['savings'] }
      ]
    },
    {
      id: 3,
      name: 'Mutual Market',
      transactions: [
        { id: 1, amount: 1000.00, type: 'transfer in', tags: ['groceries'] }
      ]
    },
  ]);

  const changeDashboard = (e) => {
    const key = e.key;
    setSelectedAccount(accounts.find(account => account.id == key));
  };

  const renderMenuItems = () => {
    return accounts.map(account => (
      <Menu.Item key={account.id}>{account.name}</Menu.Item>
    ));
  };

  const renderTransactionsTable = () => {
    const columns = [
      { title: 'Type', dataIndex: 'type', key: 'type' },
      { title: 'Amount', dataIndex: 'amount', key: 'amount' },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)
      },
    ];

    return (
      selectedAccount.transactions ?
        <Table dataSource={selectedAccount.transactions} columns={columns} />
        : null
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu
          defaultOpenKeys={['accounts']}
          defaultSelectedKeys={[selectedAccount.id ? selectedAccount.id.toString() : '']}
          theme="dark"
          mode="inline"
          onClick={changeDashboard}
        >
          <SubMenu key="accounts" icon={<UserOutlined />} title="Accounts">
            {renderMenuItems()}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header>
          <SiteHeader selectedKey="dashboard" />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><a href="Dashboard">Dashboard</a></Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col>
              <h2 className="account-name">{selectedAccount.name}</h2>
            </Col>
          </Row>
          <Row>
            <Col span={24}>{renderTransactionsTable()}</Col>
          </Row>
        </Content>
        <Footer>
          <SiteFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
