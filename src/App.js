import React, { useState } from "react";
import { Container, Navbar, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MenuComponent from "./components/Menu/Menu";
import "./App.css";

const App = () => {
  return (
    <div>
      <MenuComponent />
    </div>
  );
};

export default App;
