
// components/TextAreaInput.tsx
import React from 'react';

interface TextAreaInputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ name, value, placeholder, onChange, className }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className || 'w-full p-2 border rounded-lg'}
    />
  );
};

export default TextAreaInput;
