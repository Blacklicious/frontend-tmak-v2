import React from 'react';
import { Upload, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

interface ImageUploadProps {
  fileList: UploadFile[];
  onChange: UploadProps['onChange'];
  maxCount?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ fileList, onChange, maxCount = 1 }) => {
  return (
    <ImgCrop aspect={1}>
      <Upload
        listType="picture"
        fileList={fileList}
        onChange={onChange}
        maxCount={maxCount}
        className="w-full flex flex-col"
      >
        <Button type="primary" icon={<UploadOutlined />} className="w-full h-[35px]">
          Upload Profile Image
        </Button>
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
