import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const WhyThisMatters = () => {
  const { t } = useTranslation();
  const issues = t('whyThisMatters.issues', { returnObjects: true });

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        {t('whyThisMatters.title')}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('whyThisMatters.intro', {
          seller: t('whyThisMatters.placeholders.seller'),
          coerced: t('whyThisMatters.placeholders.coerced')
        })}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('whyThisMatters.issuesTitle')}
      </Typography>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {issues.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Typography variant="body1">
        {t('whyThisMatters.conclusion', {
          videoConsent: t('whyThisMatters.placeholders.videoConsent'),
          emotionAnalysis: t('whyThisMatters.placeholders.emotionAnalysis'),
          digitalSignatures: t('whyThisMatters.placeholders.digitalSignatures')
        })}
      </Typography>
    </Box>
  );
};

export default WhyThisMatters;
