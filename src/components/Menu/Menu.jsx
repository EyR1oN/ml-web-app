import { Breadcrumb, Layout, Button, Space, Dropdown } from "antd";
import React, { useState } from "react";
import { Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { InfoCircleOutlined } from "@ant-design/icons";
import FileUploader from "../FileUploader/FileUploader";
import Description from "../Description/Description";
import { info, urls } from "../../constants/constants";
import "./Menu.css";

const { Header, Content, Footer } = Layout;
const MenuComponent = () => {
  const [chosenModel, setChosenModel] = useState({
    name: undefined,
    url: undefined,
  });

  const handleMenuClick = (e) => {
    const item = items.find((item) => item.key === e?.key);
    setChosenModel({ name: item.label, url: urls[item?.key] });
  };

  const items = [
    {
      label: "LSTM 1",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "LSTM 2",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "BILSTM 1",
      key: "3",
      icon: <UserOutlined />,
    },
    {
      label: "BILSTM 2",
      key: "4",
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout className="layout" style={{ height: "100vh" }}>
      <Header className="menu-header">
        <div className="menu-title">CAPTCHA PREDICTION</div>
        <div className="menu-dropdown-choose-model">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {chosenModel?.name ?? <>Choose Model</>}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className="menu-content">
        <Breadcrumb className="menu-breadcrumbs"></Breadcrumb>
        <div className="menu-content-container">
          <div className="menu-content-container-title">
            Upload Captcha Image
          </div>
          <FileUploader
            url={chosenModel?.url}
            disabled={!chosenModel?.name}
          ></FileUploader>
          {/* <Description /> */}
        </div>
      </Content>
      <Footer className="menu-footer">
        <p>Copyright © My Website</p>
        <Tooltip title={info}>
          <InfoCircleOutlined className="menu-footer-info" />
        </Tooltip>
      </Footer>
    </Layout>
  );
};
export default MenuComponent;
