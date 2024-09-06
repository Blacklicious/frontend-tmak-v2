// components/FileUpload.tsx
import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';

interface FileUploadProps {
  fileList: UploadFile[];
  onChange: (info: { fileList: UploadFile[] }) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ fileList, onChange }) => {
  return (
    <Upload
      name="logo"
      listType="picture"
      fileList={fileList}
      onChange={onChange}
      beforeUpload={() => false} // Prevent automatic upload
      className="flex flex-col w-[100%]"
    >
      <Button icon={<UploadOutlined />} className="w-[100%] h-[40px] mb-2">
        Upload Logo
      </Button>
    </Upload>
  );
};

export default FileUpload;
