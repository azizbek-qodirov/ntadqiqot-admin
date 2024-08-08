import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Popover, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import './style.css';
import { Quession } from '@ui';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [array, setArray] = useState([
    "So'rovnoma 1",
    "So'rovnoma 2",
    "So'rovnoma 3",
    "So'rovnoma 4",
    "So'rovnoma 5",
    "So'rovnoma 6",
  ]);
  const [visiblePopover, setVisiblePopover] = useState<string | null>(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleDelete = (item: string) => {
    setArray(array.filter(i => i !== item));
    setVisiblePopover(null);
  };
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = array.map((item, index) => ({
    key: String(index),
    label: (
      <div className="menu-item">
        {item}
        <Popover
          content={
            <div>
              <Button type="primary" danger onClick={() => handleDelete(item)}>
                O'chirish
              </Button>
              <Button style={{ background: '#1890ff', marginLeft: 5 }} type="primary" onClick={() => setVisiblePopover(null)}>
                Bekor qilish
              </Button>
            </div>
          }
          title="Rostdan ham o'chirmoqchimisiz ?"
          trigger="click"
          open={visiblePopover === item} // Changed from `visible` to `open`
          onOpenChange={(open) => setVisiblePopover(open ? item : null)} // Changed from `onVisibleChange` to `onOpenChange`
        >
          <DeleteOutlined className="delete-icon" />
        </Popover>
      </div>
    ),
  }));

  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <Sider
        style={{ height: '100%', position: 'relative' }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={() => setCollapsed(!collapsed)}
        onCollapse={(collapsed) => {
          setCollapsed(!collapsed);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={menuItems} />
        <Quession datas={setArray} data={array} collapsed={collapsed} />
      </Sider>
      <Layout style={{ height: '100%' }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{display: 'flex', justifyContent: 'end', padding: '0px 20px'}}>
              <a href="https://docs.google.com/document/d/1OCT38qoCXS4bJpBKCldQ66rM_QoyGlrEi16wROj41do/export?format=docx" download="Document.docx">
                <Button style={{marginTop: 15}}>
                  Download Exel Document
                </Button>
              </a>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
