import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Card, List, message } from "antd";
import { useState } from "react";
import "./FileUploader.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileUploader = () => {
  const url = "/api/captcha";
  const [resultList, setResultList] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    const filteredList = newFileList.filter((file) => file.status !== "error");
    setFileList(filteredList);
  };

  const handleRemove = (file) => {
    console.log(file);
    setResultList(resultList.filter((i) => i.uid !== file.uid));
  };

  const handleError = (error) => {
    message.error("Cannot process file, refresh page.");
    console.log(error);
  };

  const handleSuccess = (response) => {
    setResultList((prev) => [...prev, response.data]);
    console.log(response.data);
  };

  return (
    <div className="file-uploader">
      <Card className="file-uploader-left-card">
        <Upload
          action={url}
          listType="picture"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onSuccess={handleSuccess}
          onError={handleError}
          onRemove={handleRemove}
        >
          {
            <div className="file-uploader-upload-container">
              <div className="file-uploader-upload-container-inner">
                <PlusOutlined />
                <div className="file-uploader-upload-btn-title">Upload</div>
              </div>
            </div>
          }
        </Upload>
      </Card>
      <Card className="file-uploader-right-card">
        <List
          header={
            <div className="file-uploader-right-card-list-header">
              Model`s prediction
            </div>
          }
          bordered
          split
          dataSource={resultList}
          renderItem={(item) => (
            <List.Item className="file-uploader-right-card-list-item">
              {item.prediction}
            </List.Item>
          )}
        />
      </Card>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
export default FileUploader;
