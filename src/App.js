import React, { useState } from "react";
import { Container, Navbar, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



const App = () => {
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
    <>
       <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>My Website</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="d-flex align-items-center justify-content-center vh-100">

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile">
            <Form.Label>Upload Captcha Image</Form.Label>
            {/* <Form.Control type="file" onChange={handleFileSelect} /> */}
            <Upload >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Group>

          <Button
  variant="primary"
  type="submit"
  disabled={!selectedFile}
  className="btn-lg btn-block"
>
  Submit
</Button>
        </Form>

        {captchaText && (
          <div className="mt-4">
            <h4>Captcha Text:</h4>
            <p>{captchaText}</p>
          </div>
        )}
      </Container>

      <footer className="mt-4 bg-light">
        <Container>
          <p>Copyright © My Website</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
