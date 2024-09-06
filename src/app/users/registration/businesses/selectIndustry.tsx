// components/IndustrySelect.tsx
import React from 'react';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { industryOptions } from './industryOptions';

interface IndustrySelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxCount: number;
}

const IndustrySelect: React.FC<IndustrySelectProps> = ({ value, onChange, maxCount }) => {
  const suffix = (
    <>
      <span>
        {value.length} / {maxCount}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <Select
      mode="multiple"
      value={value}
      style={{ width: '100%' }}
      onChange={onChange}
      suffixIcon={suffix}
      placeholder="Please select industry"
      options={industryOptions}
    />
  );
};

export default IndustrySelect;
