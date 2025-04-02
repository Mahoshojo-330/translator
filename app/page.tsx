'use client'

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';

const Home = () => {
  const [textFile, setTextFile] = useState<File | null>(null);
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    setTextFile(file ? file : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textFile) {
      setError('Please select a text file.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const response = await fetch('/api/translator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ toBeTranslated: text }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Translation failed');
        }

        const data = await response.json();
        setTranslatedText(data.translation);
      };
      reader.onerror = (error) => setError("something wrong");
      reader.readAsText(textFile);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Text File Translator
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              type="file"
              onChange={handleFileChange}
              //accept=".txt"
              fullWidth
              variant="outlined"
            //label="Select Text File"
            />
            <Box mt={2}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={!textFile || loading}
              >
                {loading ? <CircularProgress size={20} /> : 'Translate'}
              </Button>
            </Box>
            {error && (
              <Alert severity="error" onClose={() => setError('')} >
                {error}
              </Alert>
            )}
          </form>
        </Grid>
        <Grid item xs={12}>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Translated Text:
            </Typography>
            <pre>{translatedText}</pre>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;