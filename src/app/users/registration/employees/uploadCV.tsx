import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

interface CVUploadProps {
  fileList: UploadFile[];
  onChange: UploadProps['onChange'];
  customRequest: UploadProps['customRequest'];
}

const CVUpload: React.FC<CVUploadProps> = ({ fileList, onChange, customRequest }) => {
  return (
    <Upload
      accept=".pdf"
      customRequest={customRequest}
      fileList={fileList}
      onChange={onChange}
      className="w-full flex flex-col"
      maxCount={1}
    >
      <Button type="primary" icon={<UploadOutlined />} className="w-full h-[35px]">
        Upload CV (PDF)
      </Button>
    </Upload>
  );
};

export default CVUpload;
