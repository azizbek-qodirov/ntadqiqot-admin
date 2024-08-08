import { LockOutlined, UserOutlined} from '@ant-design/icons';
import { LoginFormPage, ProConfigProvider, ProFormText,} from '@ant-design/pro-components';
import { theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import './style.scss'
import { useEffect } from 'react';
import http from '../../config';

const Page = () => {
  const { token } = theme.useToken();
  // const navigate = useNavigate()
  
  useEffect(() => {
    document.title = 'Login'
  })
 
  async function handleSubmit(e:any){
    const response = await http.post('/login', e)
    console.log(response);
    // if(response.status == 200){
    //   toast.success('Tizimga kirish uchun ruxsat berildi', {autoClose: 1200})
    //   setTimeout(() => {
    //     if(response.data.role == 'admin' || response.data.role == 'worker'){
    //       navigate('/admin')
    //     }else if(response.data.role == 'user'){
    //       navigate('/user')
    //     }
    //   }, 1500);
    // }
  }
  
  return (
    <>
    <ToastContainer/>
      <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        onFinish={handleSubmit}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        title='LOGIN'
        subTitle=" "
        submitter={{
          searchConfig: {
            submitText: 'Tizimga kirish',
          },
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
          </div>
        }
      >
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Emailingizni kiriting: '}
              rules={[{
                  required: true,
                  message: 'Iltimos, emailni kiriting.',
                  type: 'email',
              }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Parolingizni kiriting: '}
              rules={[{
                required: true,
                message: 'Iltimos, parolni kiriting.',
              }]}
            />
          </>
      </LoginFormPage>
    </div>
    </>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};