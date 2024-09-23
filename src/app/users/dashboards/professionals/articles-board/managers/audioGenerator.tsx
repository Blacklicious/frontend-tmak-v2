import React, { useState } from 'react';
import axios from 'axios';

const languagesWithVoices = [
  { language: 'English (US)', code: 'en-US', voices: ['en-US-Wavenet-A', 'en-US-Wavenet-B', 'en-US-Wavenet-C'] },
  { language: 'English (UK)', code: 'en-GB', voices: ['en-GB-Wavenet-A', 'en-GB-Wavenet-B', 'en-GB-Wavenet-C'] },
  { language: 'French', code: 'fr-FR', voices: ['fr-FR-Standard-C', 'fr-FR-Standard-B'] },
  { language: 'Spanish', code: 'es-ES', voices: ['es-ES-Wavenet-A', 'es-ES-Wavenet-B'] },
  { language: 'German', code: 'de-DE', voices: ['de-DE-Wavenet-A', 'de-DE-Wavenet-B'] },
  // Add more languages and voices as needed
];

const ArticleAudioGenerator = () => {
  const [articleId, setArticleId] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState(languagesWithVoices[0].code);
  const [voice, setVoice] = useState(languagesWithVoices[0].voices[0]);
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAudio = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/article/${articleId}/generate-audio/api/`, {
        language,
        content,
        voice,
      });

      setAudioUrl(response.data.audio.audio);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to generate audio. Please try again.');
      console.error(error);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    const selectedVoices = languagesWithVoices.find(lang => lang.code === selectedLanguage)?.voices || [];
    setLanguage(selectedLanguage);
    setVoice(selectedVoices[0]); // Automatically select the first voice for the new language
  };

  return (
    <div className="article-audio-generator p-2 bg-black/40 rounded-lg">
      <h2>Generate Article Audio</h2>
      <div>
        <label>Article ID:</label>
        <input
          type="text"
          value={articleId}
          onChange={(e) => setArticleId(e.target.value)}
          placeholder="Enter article ID"
        />
      </div>

      <div>
        <label>Language:</label>
        <select value={language} onChange={handleLanguageChange}>
          {languagesWithVoices.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.language}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Voice:</label>
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          {languagesWithVoices.find(lang => lang.code === language)?.voices.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter article content"
        />
      </div>
      <button onClick={handleGenerateAudio} disabled={loading}>
        {loading ? 'Generating Audio...' : 'Generate Audio'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {audioUrl && (
        <div>
          <h3>Audio Generated Successfully!</h3>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default ArticleAudioGenerator;