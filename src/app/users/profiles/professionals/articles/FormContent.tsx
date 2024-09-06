import React, { useState } from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

interface ContentEditorProps {
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onContentChange }) => {
  const [introduction, setIntroduction] = useState('');
  const [paragraphs, setParagraphs] = useState<{ title: string; content: string }[]>([]);
  const [conclusion, setConclusion] = useState('');

  const addParagraph = () => {
    setParagraphs([...paragraphs, { title: '', content: '' }]);
  };

  const handleParagraphChange = (index: number, field: 'title' | 'content', value: string) => {
    const updatedParagraphs = paragraphs.map((paragraph, i) =>
      i === index ? { ...paragraph, [field]: value } : paragraph
    );
    setParagraphs(updatedParagraphs);
  };

  const handleContentChange = () => {
    const contentArray = [introduction];
    paragraphs.forEach(paragraph => {
      contentArray.push(paragraph.title);
      contentArray.push(paragraph.content);
    });
    contentArray.push(conclusion);
    const contentJson = JSON.stringify({ en: contentArray });
    onContentChange(contentJson);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg ">
      <h3 className="text-lg font-semibold mb-4">Article Content</h3>
      <TextArea
        placeholder="Introduction"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        onBlur={handleContentChange}
        className="mb-2"
      />
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="mb-2">
          <Input
            placeholder="Paragraph Title"
            value={paragraph.title}
            onChange={(e) => handleParagraphChange(index, 'title', e.target.value)}
            onBlur={handleContentChange}
            className="mb-2"
          />
          <TextArea
            placeholder="Paragraph Content"
            value={paragraph.content}
            onChange={(e) => handleParagraphChange(index, 'content', e.target.value)}
            onBlur={handleContentChange}
            rows={4}
          />
        </div>
      ))}
      <Button type="dashed" onClick={addParagraph} className="w-full mb-4">
        Add Paragraph
      </Button>
      <TextArea
        placeholder="Conclusion"
        value={conclusion}
        onChange={(e) => setConclusion(e.target.value)}
        onBlur={handleContentChange}
        className="mb-2"
      />
    </div>
  );
};

export default ContentEditor;
