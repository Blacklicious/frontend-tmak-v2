// components/TextInput.tsx
import React from 'react';

interface TextInputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({ type, name, value, placeholder, onChange, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className || 'w-full p-2 border rounded-lg'}
    />
  );
};

export default TextInput;
