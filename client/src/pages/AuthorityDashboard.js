import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TagIcon from '@mui/icons-material/Tag';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [sampleData, setSampleData] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/video/getMetaData/${userId}`);
        setSampleData(response.data); // Use response.data for axios
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = sampleData.filter(
      (item) =>
        item?.seller?.fullName?.toLowerCase().includes(text.toLowerCase()) ||
        item?.consentRecordId?.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <Box sx={{ p: 4, paddingTop: '100px', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Paper
        elevation={6}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 2,
          bgcolor: '#1e1e2f',
          borderRadius: 3,
          mb: 2,
        }}
      >
        <Stack direction="row" alignItems="center">
          <SearchIcon sx={{ color: 'white', mr: 1 }} />
          <TextField
            variant="standard"
            placeholder="Search by Name or Consent ID"
            fullWidth
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: { color: 'white' },
            }}
          />
          {query && (
            <IconButton onClick={clearSearch}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
        </Stack>
      </Paper>

      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 3,
          bgcolor: '#22253a',
          borderRadius: 3,
          color: 'white',
          textAlign: 'center',
        }}
      >
        {results.length === 0 ? (
          <>
            <TagIcon sx={{ fontSize: 40, color: 'grey.500' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No results found
            </Typography>
            <Typography variant="body2" color="grey.500">
              “{query}” did not match any seller records.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results
            </Typography>
            {results.map((item, idx) => (
              <Box key={idx} sx={{ mb: 3, textAlign: 'left' }}>
                <Typography variant="subtitle1"><b>Seller Name:</b> {item.seller.fullName}</Typography>
                <Typography variant="body2"><b>Consent ID:</b> {item.consentRecordId}</Typography>
{item.result && (
  <Typography variant="body2" sx={{ mt: 1 }}>
    <b>AI Sentiment Result:</b>{' '}
    <span style={{
      color: item.result === 'Green' ? '#4caf50' :
             item.result === 'Yellow' ? '#ffeb3b' :
             item.result === 'Red' ? '#f44336' : 'white',
      fontWeight: 'bold'
    }}>
      {item.result}
    </span>
  </Typography>
)}
                {item.videoConsent?.videoUrl && (
                  <>
                    <Typography variant="body2" sx={{ mt: 1 }}><b>Consent Video:</b></Typography>
                    <video width="100%" controls src={item.videoConsent.videoUrl} style={{ borderRadius: 8, marginTop: 4 }} />
                  </>
                )}

                {item.digitalSignature?.signedDocUrl && (
                  <>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      <b>Signed Document:</b>{' '}
                      <a
                        href={item.digitalSignature.signedDocUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#90caf9' }}
                      >
                        View Signed Doc
                      </a>
                    </Typography>
                  </>
                )}
              </Box>
            ))}
          </>
        )}
      </Paper>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{ mt: 4, flexWrap: 'wrap' }}
      >
        <Chip label="tags" variant="outlined" />
        <Chip label="navigate" variant="outlined" />
        <Chip label="open" variant="outlined" />
        <Chip label="esc" variant="outlined" />
        <Chip label="close" variant="outlined" />
        <Chip label="parent" variant="outlined" />
      </Stack>
    </Box>
  );
};

export default SearchComponent;
