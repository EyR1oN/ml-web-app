import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Card, List } from 'antd';
import { useState } from 'react';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const FileUploader = () => {
  const url = "/api/captcha";

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ]);
  console.log(fileList);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSuccess = (response) => {
    // TODO implement here
    console.log(response);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <Card style={{ flex: 1 }}>
        <Upload
          action={url}
          listType='picture'
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onSuccess={handleSuccess}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
      </Card>
      <Card style={{ flex: 1, marginRight: 16 }}>
        <List
          header={<div>Model`s prediction</div>}
          bordered
          split
          dataSource={['String 1', 'String 2', 'String 3', 'String 4']}
          renderItem={(item) => <List.Item style={{height: '62px'}}>{item}</List.Item>}
        />
      </Card>

      

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};
export default FileUploader;
