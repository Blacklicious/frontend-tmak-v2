import React from 'react';
import { Form, Input, Button, Upload, Space } from 'antd';
import { UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface ContentSection {
  title: string;
  content: string;
  illustration?: { file: any; name: string };
}

interface ContentProps {
  initialContent: ContentSection[];
  onChange?: (cotent: ContentSection[]) => void;
}

const ContentEditor: React.FC<ContentProps> = ({ initialContent = [], onChange }) => {
  const [sections, setSections] = React.useState<ContentSection[]>(initialContent);

  const handleAddSection = () => {
    const newSection: ContentSection = { title: '', content: '' };
    setSections([...sections, newSection]);
    if (onChange) {
      onChange([...sections, newSection]);
    }
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, idx) => idx !== index);
    setSections(updatedSections);
    if (onChange) {
      onChange(updatedSections);
    }
  };

  const handleFieldChange = (index: number, field: keyof ContentSection, value: any) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === index) {
        return { ...section, [field]: value };
      }
      return section;
    });
    setSections(updatedSections);
    if (onChange) {
      onChange(updatedSections);
    }
  };

  const handleIllustrationChange = (index: number, file: any) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === index) {
        return { ...section, illustration: { file, name: file.name } };
      }
      return section;
    });
    setSections(updatedSections);
    if (onChange) {
      onChange(updatedSections);
    }
  };

  return (
    <div>
      {sections.map((section, index) => (
        <Space key={index} direction="vertical" style={{ marginBottom: 16 }} 
          className="w-full bg-black/20 rounded-lg p-2">
          <div >
            <Input
              value={section.title}
              onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
              placeholder={`Enter title for section ${index + 1}`}
              className='bg-white'
              
            />
          </div>

          <div className=''>
            <Input.TextArea
              value={section.content}
              onChange={(e) => handleFieldChange(index, 'content', e.target.value)}
              placeholder={`Enter content for section ${index + 1}`}
              rows={8}
              className='bg-white '
            />
          </div>

          <div >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent auto-upload
              onChange={(info) => handleIllustrationChange(index, info.file)}
              className="flex flex-col"
            >
              <Button icon={<UploadOutlined />}
                className="w-full">Upload Illustration</Button>
            </Upload>
            {section.illustration && <p>{section.illustration.name}</p>}
          </div>

          <Button
            type="dashed"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveSection(index)}
            className="w-full"
          >
            Remove Paragraph
          </Button>
        </Space>
      ))}

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={handleAddSection}
        className="w-full"
      >
        Add Paragraph
      </Button>
    </div>
  );
};

export default ContentEditor;