# Speed Reader

A web application for speed reading using RSVP (Rapid Serial Visual Presentation) technique.

## What is RSVP?

RSVP displays text one word at a time at a fixed location on screen. This eliminates eye movement (saccades) between words, allowing you to read faster. The red letter marks the "Optimal Recognition Point" (ORP) - the point in each word where your eye naturally focuses.

## Features

- **File Upload**: Upload any `.txt` or `.md` file to read
- **RSVP Display**: Words displayed one at a time with centered ORP
- **Adjustable Speed**: Control reading speed from 100-1000 WPM (words per minute)
- **Playback Controls**: Play/pause and restart functionality
- **Progress Tracking**: Visual progress bar shows reading position

## How to Use

1. Open the application in your browser
2. Drag and drop a text file or click to select
3. The words will display one at a time
4. The **red letter** stays centered - this is the ORP
5. Use **+/-** buttons or preset buttons to adjust WPM speed
6. Click **pause** to pause, **restart** to begin again
7. Click **Back** to upload a different file

## Technical Details

- Built with React + TypeScript + Tailwind CSS v4
- Vite for development and building
- The ORP is calculated based on word length:
  - 1-3 letters: first letter
  - 4-5 letters: second letter
  - 6-9 letters: third letter
  - 10-13 letters: fourth letter
  - 14+ letters: ~30% of word length

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Tips for Speed Reading

- Start at a comfortable speed (250-300 WPM)
- Gradually increase as you get comfortable
- Relax your eyes and let the words flow
- Don't subvocalize (say words in your head)
- Focus on the red letter - it stays in the same place

## License

MIT
```
