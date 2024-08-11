import { useState } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';
import { ProFormText } from '@ant-design/pro-components';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './style.scss'
import http from '../../../config';

function Index(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      options: values.options.map((option: any) => ({
        ...option,
        ball: Number(option.ball),
      })),
    };
  
    console.log(formattedValues);
    const response = await http.post('/poll', formattedValues, {});
    console.log(response);
    setIsModalOpen(false);
    form.resetFields();
  };

  const getAlphabetLabel = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <>
      <Button className={props?.collapsed ? '' : 'modal-hidden'} type='primary' style={{ width: '90%', position: 'absolute', bottom: 0, left: 10 }} onClick={showModal}>
        To'plam yaratish
      </Button>
      <Modal title={"So'rovnoma to'plam yaratish"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            options: [{ variant: '', ball: '' }]
          }}
        >
          <ProFormText
            initialValue={''}
            hasFeedback
            name="title"
            placeholder="Iltimos so'rovnoma to'plami nomini kiriting"
            rules={[
              {
                required: true,
                message: "To'plam nomini kiriting!",
              },
            ]}
          />
          
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space key={key} style={{ display: 'block', marginBottom: 8, width: '100%', position: 'relative' }} align="baseline">
                    <span style={{ position: 'absolute', top: 5, left: 0, fontWeight: 700 }}>
                      {getAlphabetLabel(index)}
                    </span>
                   <div style={{display: 'flex-box', alignItems: 'center', width: '100%', position: 'relative'}}>
                    <Form.Item
                        {...restField}
                        name={[name, 'variant']}
                        rules={[{ required: true, message: 'Variant kiriting!' }]}
                        style={{ flex: 1, width: '70%', paddingLeft: 20 }}  
                      >
                        <Input style={{width: '100%'}} placeholder="Variant kiriting (masalan: har doim, odatda)" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'ball']}
                        rules={[{ required: true, message: 'Ball kiriting!' }]}
                        style={{ flex: 1, width: '28%', position: 'absolute', right: 0, top: 0 }}  
                      >
                        <Input style={{width: '100%'}} placeholder="Ball kiritng" />
                      </Form.Item>
                    </div>
                    {fields.length > 1 && (
                      <MinusCircleOutlined style={{position: 'absolute', top: 10, right: 10}} onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Variant qo'shish
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button type="primary" htmlType="submit">
              Yaratish
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Index;
