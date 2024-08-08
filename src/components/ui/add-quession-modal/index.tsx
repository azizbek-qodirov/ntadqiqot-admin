import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { ProFormText } from '@ant-design/pro-components';
import './styls.scss'

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handleSubmit(values: any){
    console.log(values);
    handleCancel();
  }



  return (
    <>
      <Button type='primary' style={{marginBottom: 20, width: '100%', maxWidth: '200px'}} onClick={showModal}>
        So'rovnoma qo'shish
      </Button>
      <Modal
        title={"So'rovnoma qo'shish"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={(values) => handleSubmit(values)} form={form} layout="vertical">
          <ProFormText
            name="question_name"
            label="So'rovnoma nomi"
            placeholder="Iltimos so'rovnoma nomini kiriting"
            rules={[{ required: true, message: "So'rovnoma nomini kiriting !" }]}
          />

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button htmlType='submit' type="primary">
              Yaratish
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Index;
