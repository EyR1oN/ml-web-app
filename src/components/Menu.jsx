import { Breadcrumb, Layout, Menu as Menu, theme, Button } from 'antd';
import { Container, Navbar, Form, Image } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FileUploader from './FileUploader';

const { Header, Content, Footer } = Layout;
const MenuComponent = () => {
    const [captchaText, setCaptchaText] = useState("");
    const [selectedFile, setSelectedFile] = useState();
  
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
        <Menu
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
        />
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
          <Form.Group controlId="formFile" style={{ height: '50%'}}>
            <Form.Label>Upload Captcha Image</Form.Label>
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