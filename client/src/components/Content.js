import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import logo  from '../assets/logo.svg';
import { useTranslation } from 'react-i18next'; 


export default function SellerVerificationContent() {
    const { t } = useTranslation();
  
    const items = [
      {
        icon: <VerifiedUserRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: t("trusted_verification"),
        description: t("trusted_verification_desc"),
      },
      {
        icon: <SecurityRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: t("secure_transactions"),
        description: t("secure_transactions_desc"),
      },
      {
        icon: <AssignmentTurnedInRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: t("compliance_guaranteed"),
        description: t("compliance_guaranteed_desc"),
      },
      {
        icon: <GppGoodRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: t("fraud_prevention"),
        description: t("fraud_prevention_desc"),
      },
    ];
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src={logo} alt="Logo" style={{ width: '40%', height: 'auto' }} /> 
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
