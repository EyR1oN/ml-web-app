import React, { useState } from "react";
import { Container, Navbar, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MenuComponent from "./components/Menu";



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
    <div className="App">
    <MenuComponent/>
    </div>
  );
}

export default App;
