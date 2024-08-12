import React, { useEffect, useState } from 'react';
import { DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Popover, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import './style.css';
import { Quession, QuessionEdit } from '@ui';
import http from '../config';
import { MenuIds } from '@store';
import { toast } from 'react-toastify';
import Logo from '@images/logo.jpg'
import { getCookies, removeCookies } from '../utils/cocies';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState<string | null>(null);
  const [selectedMenuKey, setSelectedMenuKey] = useState<string | null>(null);
  const { changeMenu_id }: any = MenuIds();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function getMenuData() {
    const response = await http.get('/polls');
    setMenuData(response?.data?.poll);

    if (response?.data?.poll?.length > 0) {
      const firstItemId = response?.data?.poll[0]?.id;
      changeMenu_id(firstItemId);
      setSelectedMenuKey('0');
    }
  }

  useEffect(() => {
    const token = getCookies('access_token');
    if(!token){
      navigate('/')
    }
    getMenuData();
  }, []);

  const handleDelete = async (item: any) => {
    try{
      const response = await http.delete(`/poll/${item?.id}`);
      toast.success("To'plam muvaffaqiyatli o'chirildi", {autoClose: 1200})
    }catch(err){
      toast.error("To'plam o'chirishda qandaydir muommo paydo bo'ldi")
    }
    setVisiblePopover(null);
    getMenuData();
  };

  function logout(){
    removeCookies('access_token');
    navigate('/')
  }
  const handleMenuClick = (e: any) => {
    setSelectedMenuKey(e.key);
    const clickedItem: any = menuData[e.key];
    if (clickedItem) {
      changeMenu_id(clickedItem.id);
    }
  };

  const menuItems = menuData.map((item: any, index) => ({
    key: String(index),
    label: (
      <div className="menu-item">
        {item.title.length > 32 ? `${item.title.slice(0, 12)}...` : `${item.title}`}
        <Popover
          content={
            <div>
              <Button type="primary" danger onClick={() => handleDelete(item)}>
                O'chirish
              </Button>
              <Button
                style={{ background: '#1890ff', marginLeft: 5 }}
                type="primary"
                onClick={() => setVisiblePopover(null)}
              >
                Bekor qilish
              </Button>
            </div>
          }
          title="Rostdan ham o'chirmoqchimisiz ?"
          trigger="click"
          open={visiblePopover === item.id} // Changed from item.title to item.id
          onOpenChange={(open) => setVisiblePopover(open ? item.id : null)} // Changed from item.title to item.id
        >
          <DeleteOutlined className="delete-icon" />
        </Popover>
        <QuessionEdit data={item} getData={getMenuData}/>
      </div>
    ),
  }));

  return (
   <>
    <Layout style={{ width: '100%', minHeight: '100vh' }}>
      <Sider
        style={{ height: 'auto', minHeight: '100vh', position: 'relative' }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={() => setCollapsed(!collapsed)}
        onCollapse={(collapsed) => {
          setCollapsed(!collapsed);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuKey || '0']}
          onClick={handleMenuClick}
          items={menuItems || ''}
        />
        <Quession getData={getMenuData} datas={setMenuData} data={menuData} collapsed={collapsed} />
      </Sider>
      <Layout style={{ height: '100%' }}>
        <Header style={{ padding: 0, background: colorBgContainer, height: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px' }}>
            <div className={`logo-wrapper ${collapsed ? '' : 'logo-hidden'}`}>
              <img className='logo' src={Logo} alt="" />
              <p>Researchpsy</p>
            </div>
           <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <a
                style={{ width: '100%', maxWidth: '300px', display: 'block' }}
                href="https://docs.google.com/document/d/1OCT38qoCXS4bJpBKCldQ66rM_QoyGlrEi16wROj41do/export?format=docx"
                download="Document.docx"
              >
                <Button style={{ marginTop: 15, width: '100%' }}>Download Exel Document</Button>
              </a>
             <Button style={{padding: 20}}  onClick={() => logout()}>
              <p  style={{display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer'}}>
                <LogoutOutlined style={{fontSize: 24}}/>
                  Logout
                </p>
             </Button>
           </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
    </>
  );
};

export default App;
