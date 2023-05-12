import { Breadcrumb, Layout, Menu, theme, Button, Space, message, Dropdown } from 'antd';
import { Container, Navbar, Form, Image } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { Upload, MenuProps } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { UploadOutlined } from '@ant-design/icons';
import FileUploader from './FileUploader';

const { Header, Content, Footer } = Layout;
const MenuComponent = () => {
    const [captchaText, setCaptchaText] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
  
    const handleMenuClick = (e) => {
      message.info('Click on menu item.');
      console.log('click', e);
    };

    const items = [
      {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
      },
      {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
      },
      {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
      },
      {
        label: '4rd menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
      },
    ];
    
    const menuProps = {
      items,
      onClick: handleMenuClick,
    };


    const props = {
      beforeUpload: file => {
        handleFileSelect(file);
        return false;
      },
    };
  
    const handleFileSelect = (event) => {
      const file = event.target.files && event.target.files[0];
      setSelectedFile(file);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!selectedFile) return;
    
        const formData = new FormData();
        formData.append("image", selectedFile);
    
        try {
          const response = await axios.post("/api/captcha", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          setCaptchaText(response.data.text);
        } catch (error) {
          console.error(error);
          alert("Error occurred while processing captcha.");
        }
      };

  return (
    <Layout className="layout" style={{ height:"100vh" }}>
      <Header>
        <div className="logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        /> */}
        <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      </Header>
      <Content
        style={{
          padding: '0 50px',
          
            overflow: 'auto'
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: "white",
            height: '100%',
            minHeight: '280px',
            padding: '24px'
          }}
        >
            <Form onSubmit={handleSubmit} style={{ height: '100%'}}>
          <Form.Group controlId="formFile" >
            <Form.Label style={{fontSize: '2rem', display: 'flex', justifyContent: 'center', padding: '30px 30px 30px 30px'}}>UPLOAD CAPTCHA IMAGE</Form.Label>
            <FileUploader></FileUploader>
          </Form.Group>
          </Form>

          {captchaText && (
          <div className="mt-4">
            <h4>Captcha Text:</h4>
            <p>{captchaText}</p>
          </div>
        )}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        <p>Copyright © My Website</p>
      </Footer>
    </Layout>
  );
};
export default MenuComponent;
