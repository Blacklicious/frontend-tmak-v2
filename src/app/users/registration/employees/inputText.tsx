import React from 'react';

interface TextInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({ type, name, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-lg ${className}`}
    />
  );
};

export default TextInput;
