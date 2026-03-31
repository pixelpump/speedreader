import { useState, useCallback, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import Reader from './components/Reader';

function App() {
  const [text, setText] = useState<string>('');
  const [isReading, setIsReading] = useState(false);

  const handleFileLoad = useCallback((content: string) => {
    setText(content);
    setIsReading(true);
  }, []);

  const handleTestText = useCallback(async () => {
    try {
      const response = await fetch('/speedreader/test.txt');
      if (!response.ok) throw new Error('Failed to load test text');
      const content = await response.text();
      setText(content);
      setIsReading(true);
    } catch {
      alert('Failed to load test text');
    }
  }, []);

  const handleReset = useCallback(() => {
    setText('');
    setIsReading(false);
  }, []);

  // Check for text in URL query parameters (from Chrome extension)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textFromUrl = params.get('text');
    if (textFromUrl) {
      setText(textFromUrl);
      setIsReading(true);
      // Clean up the URL without reloading
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {!isReading ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <img src="/speedreader/logo.png" alt="Speed Reader" className="w-24 h-24 mb-6" />
          <h1 className="text-4xl md:text-5xl font-light mb-2 tracking-tight">Speed Reader</h1>
          <p className="text-gray-400 mb-8 text-lg">Upload a text file to begin</p>
          <FileUpload onFileLoad={handleFileLoad} />
          <button
            onClick={handleTestText}
            className="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
          >
            Test Text
          </button>
        </div>
      ) : (
        <Reader text={text} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
