import React from 'react';

interface TextAreaInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ name, placeholder, value, onChange, className }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-lg ${className}`}
    />
  );
};

export default TextAreaInput;
