import { useState, useCallback } from 'react';
import FileUpload from './components/FileUpload';
import Reader from './components/Reader';

function App() {
  const [text, setText] = useState<string>('');
  const [isReading, setIsReading] = useState(false);

  const handleFileLoad = useCallback((content: string) => {
    setText(content);
    setIsReading(true);
  }, []);

  const handleReset = useCallback(() => {
    setText('');
    setIsReading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {!isReading ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <img src="/speedreader/logo.png" alt="Speed Reader" className="w-24 h-24 mb-6" />
          <h1 className="text-4xl md:text-5xl font-light mb-2 tracking-tight">Speed Reader</h1>
          <p className="text-gray-400 mb-8 text-lg">Upload a text file to begin</p>
          <FileUpload onFileLoad={handleFileLoad} />
        </div>
      ) : (
        <Reader text={text} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
