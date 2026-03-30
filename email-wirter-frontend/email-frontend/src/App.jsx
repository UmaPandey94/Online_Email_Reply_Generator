
import './App.css'
import { useState } from 'react';
import axios from "axios";
import { Container, Typography, Box, TextField, CircularProgress } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Button } from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedReply, setGenerateReply] = useState('');
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8087/api/email/generate", { emailContent, tone });
      setGenerateReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
      );

    }
    catch (error) {
        console.error("Error generating reply:", error);
    }
    finally {
      setLoading(false);
    }
  };
  const handleAutoResize = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
};
  return (
    <>
      <Container maxWidth="md" sx={{py:4}}>
        <Typography variant='h2' component="h1" gutterBottom>
         Email Reply Generator
        </Typography>
        <Box sx={{mx:3}}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Orignal Email Content"
            onInput={handleAutoResize}
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)} 
            sx={{mb:2}}
          />
  <FormControl fullWidth  sx={{mb:2}}>
   <InputLabel >Tone (Optional)</InputLabel>
       <Select
          value={tone || ''}
          label="Age"
          onChange={(e)=> setTone(e.target.value)}
  >
    <MenuItem value="">None</MenuItem>
    <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
     </Select>
  </FormControl>
          <Button variant="contained"
            onClick={handleSubmit}
            sx={{mb:2}}
            disabled={!emailContent || loading}>{loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>  
           <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Generated Reply"
            onInput={handleAutoResize}
            value={generatedReply|| ''}
            inputProps={{readOnly:true}}
            sx={{mb:2}}
          />
          <Button
            variant='outlined' onClick={() => navigator.clipboard.writeText(generatedReply)}>
            Copy to clipboard
          </Button>
        </Box>
     </Container>
    </>
  )
}

export default App
