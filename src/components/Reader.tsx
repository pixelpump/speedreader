import { useState, useEffect, useCallback, useRef } from 'react';

interface ReaderProps {
  text: string;
  onReset: () => void;
}

// Calculate the Optimal Recognition Point (ORP) for a word
// This is typically around 30-35% of the word length, but capped
function getORPIndex(word: string): number {
  const length = word.length;
  if (length <= 1) return 0;
  if (length <= 3) return 0;
  if (length <= 5) return 1;
  if (length <= 9) return 2;
  if (length <= 13) return 3;
  return Math.floor(length * 0.3);
}

export default function Reader({ text, onReset }: ReaderProps) {
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(300);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<number | null>(null);

  // Parse text into words
  useEffect(() => {
    const parsed = text
      .replace(/[\n\r]+/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 0);
    setWords(parsed);
    setCurrentIndex(0);
    setProgress(0);
  }, [text]);

  // Update progress
  useEffect(() => {
    if (words.length > 0) {
      setProgress((currentIndex / words.length) * 100);
    }
  }, [currentIndex, words.length]);

  // Handle word advancement
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const msPerWord = 60000 / wpm;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= words.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, msPerWord);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, wpm, words.length]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(true);
  }, []);

  const handleWpmChange = useCallback((newWpm: number) => {
    setWpm(newWpm);
  }, []);

  const currentWord = words[currentIndex] || '';
  const orpIndex = getORPIndex(currentWord);

  // Split word into before, ORP, and after
  const beforeORP = currentWord.slice(0, orpIndex);
  const orpChar = currentWord[orpIndex] || '';
  const afterORP = currentWord.slice(orpIndex + 1);

  // Create a ref to measure the before-ORP text width and ORP char width
  const beforeRef = useRef<HTMLSpanElement>(null);
  const orpRef = useRef<HTMLSpanElement>(null);
  const [beforeWidth, setBeforeWidth] = useState(0);
  const [orpWidth, setOrpWidth] = useState(0);

  useEffect(() => {
    if (beforeRef.current) {
      setBeforeWidth(beforeRef.current.getBoundingClientRect().width);
    }
    if (orpRef.current) {
      setOrpWidth(orpRef.current.getBoundingClientRect().width);
    }
  }, [beforeORP, orpChar]);

  // Recalculate widths on window resize
  useEffect(() => {
    const handleResize = () => {
      if (beforeRef.current) {
        setBeforeWidth(beforeRef.current.getBoundingClientRect().width);
      }
      if (orpRef.current) {
        setOrpWidth(orpRef.current.getBoundingClientRect().width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Top bar with controls */}
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-sm z-10">
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleRestart}
            className="text-gray-400 hover:text-white transition-colors"
            title="Restart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main reading area */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl">
        {/* Top alignment line */}
        <div className="w-full flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gray-800"></div>
          <div className="w-px h-4 bg-gray-600 mx-0"></div>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        {/* Word display with centered ORP */}
        <div className="relative h-32 flex items-center justify-center w-full">
          {/* Center marker line - fixed in center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 -translate-x-1/2 z-10"></div>

          {/* Hidden elements to measure widths */}
          <span ref={beforeRef} className="absolute opacity-0 pointer-events-none text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            {beforeORP}
          </span>
          <span ref={orpRef} className="absolute opacity-0 pointer-events-none text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            {orpChar}
          </span>

          {/* Word - positioned so ORP center aligns with center line */}
          <div 
            className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight flex items-baseline whitespace-nowrap absolute"
            style={{ 
              transform: `translateX(calc(${-beforeWidth}px - ${orpWidth / 2}px))`,
              left: '50%'
            }}
          >
            <span className="text-white">{beforeORP}</span>
            <span className="text-red-500">{orpChar}</span>
            <span className="text-white">{afterORP}</span>
          </div>
        </div>

        {/* Bottom alignment line */}
        <div className="w-full flex items-center justify-center mt-8">
          <div className="flex-1 h-px bg-gray-800"></div>
          <div className="w-px h-4 bg-gray-600 mx-0"></div>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0a0a0a]/90 backdrop-blur-sm">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full mb-6">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* WPM control */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleWpmChange(Math.max(100, wpm - 50))}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-2xl font-light text-white min-w-[140px] text-center">
              {wpm} <span className="text-gray-500 text-lg">wpm</span>
            </span>
            <button
              onClick={() => handleWpmChange(Math.min(1000, wpm + 50))}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* WPM presets */}
          <div className="flex gap-2">
            {[200, 300, 400, 500].map((speed) => (
              <button
                key={speed}
                onClick={() => handleWpmChange(speed)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  wpm === speed
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
