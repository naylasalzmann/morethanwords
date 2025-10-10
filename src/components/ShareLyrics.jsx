import { Button, Box, Typography } from '@mui/material';
import { toPng } from 'html-to-image';
import { sanitizeFileName } from '../utils/fileUtils';

export default function ShareLyrics({ targetRef, songName }) {

  const handleShare = async () => {
    if (!targetRef?.current) return;

    const safeName = sanitizeFileName(songName ?? 'song-lyrics');
    
    try {
      const dataUrl = await toPng(targetRef.current, { cacheBust: true });

      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${safeName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to share image:', err);
    }
  };

  return (
    <Box mt={3} textAlign="center">
      <Button
        onClick={handleShare}
        variant="contained"
        sx={{
          backgroundColor: '#E1306C',
          '&:hover': { backgroundColor: '#C42D5F' },
        }}
      >
        Download
      </Button>
      <Typography variant="body2" mt={2} color="text.secondary">
        (Share feature to be implemented)
      </Typography>
    </Box>
  );
}