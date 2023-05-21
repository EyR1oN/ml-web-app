import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Card, List, message } from "antd";
import { useState } from "react";
import axios from "axios";
import "./FileUploader.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileUploader = ({ url, disabled }) => {
  const [resultList, setResultList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

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
    setResultList(resultList.filter((i) => i.uid !== file.uid));
  };

  const handleError = (error) => {
    message.error(error);
  };

  const handleSuccess = (response) => {
    const { prediction } = response;
    setResultList((prev) => [...prev, { prediction }]);

    const uploadedFile = fileList.find((file) => file.uid === response.uid);

    if (uploadedFile) {
      uploadedFile.status = "done";
      setFileList([...fileList]);
    }
  };

  const handleBeforeUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file.file);
    formData.append("uid", file.file.uid);

    axios
      .post(url, formData)
      .then((response) => {
        handleSuccess(response.data);
      })
      .catch((error) => {
        handleError(error);
      });

    return false;
  };

  return (
    <div className="file-uploader">
      <Card className="file-uploader-left-card">
        <Upload
          customRequest={handleBeforeUpload}
          action={url}
          listType="picture"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onSuccess={handleSuccess}
          onError={handleError}
          disabled={disabled}
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
