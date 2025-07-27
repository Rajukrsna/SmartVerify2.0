import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useAuth } from "./AuthContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  margin: theme.spacing(1),
  borderRadius: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('xs')]: {
    maxWidth: '100%',
    margin: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    width: '450px',
    maxWidth: '450px',
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    width: '450px',
    padding: theme.spacing(4),
    margin: 0,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'auto',
    '& .MuiTextField-root': {
      '& .MuiInputBase-root': {
        height: '48px',
      },
    },
    '& .MuiButton-root': {
      height: '48px',
      fontSize: '1rem',
    },
  },
}));

export default function SignInCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLoginClick = () => {
    navigate('/authority');
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/authRoute/login`, { email, password });
      if (response.data) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        const token = response.data.token;    
        login(token);

        navigate("/seller-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card variant="outlined">
      <Typography 
        component="h1" 
        variant={isMobile ? "h5" : "h4"}
        sx={{ 
          fontSize: { 
            xs: 'clamp(1.5rem, 8vw, 2rem)', 
            sm: 'clamp(1.75rem, 8vw, 2.15rem)',
            md: 'clamp(2rem, 10vw, 2.15rem)'
          },
          textAlign: 'center',
          mb: { xs: 1, md: 0 }
        }}
      >
        Sign in
      </Typography>
      
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 1.5, md: 2 },
          width: '100%'
        }}
      >
        <FormControl>
          <FormLabel 
            htmlFor="email"
            sx={{ 
              fontSize: { xs: '0.9rem', md: '1rem' },
              mb: 0.5
            }}
          >
            Email
          </FormLabel>
          <TextField 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            fullWidth 
            variant="outlined"
            size={isMobile ? "medium" : "medium"}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: { xs: '1rem', md: '1rem' },
              }
            }}
          />
        </FormControl>
        
        <FormControl>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 0.5,
              mb: 0.5
            }}
          >
            <FormLabel 
              htmlFor="password"
              sx={{ 
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Password
            </FormLabel>
            <Link 
              component="button" 
              onClick={handleClickOpen} 
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.875rem' },
                textAlign: 'right'
              }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            fullWidth 
            variant="outlined"
            size={isMobile ? "medium" : "medium"}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: { xs: '1rem', md: '1rem' },
              }
            }}
          />
        </FormControl>
        
        <FormControlLabel 
          control={<Checkbox value="remember" color="primary" />} 
          label="Remember me"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: { xs: '0.9rem', md: '1rem' }
            }
          }}
        />
        
        <ForgotPassword open={open} handleClose={handleClose} />
        
        <Button 
          type="submit" 
          fullWidth 
          variant="contained"
          size={isMobile ? "large" : "large"}
          sx={{
            mt: { xs: 1, md: 1 },
            py: { xs: 1.5, md: 1.5 },
            fontSize: { xs: '1rem', md: '1rem' },
            fontWeight: 'bold'
          }}
        >
          Sign in
        </Button>
        
        <Typography 
          sx={{ 
            textAlign: 'center',
            fontSize: { xs: '0.9rem', md: '1rem' },
            mt: { xs: 1, md: 0 }
          }}
        >
          Don&apos;t have an account?{' '}
          <Link 
            href="/sign-up" 
            variant="body2"
            sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
      
      <Divider sx={{ my: { xs: 1.5, md: 2 } }}>or</Divider>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: { xs: 1.5, md: 2 }
      }}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<GoogleIcon />}
          size={isMobile ? "large" : "large"}
          sx={{
            py: { xs: 1.5, md: 1.5 },
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Sign in with Google
        </Button>
        
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<FacebookIcon />}
          size={isMobile ? "large" : "large"}
          sx={{
            py: { xs: 1.5, md: 1.5 },
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>
      
      <Divider sx={{ my: { xs: 1.5, md: 2 } }} />
      
      <Button 
        onClick={handleLoginClick}
        fullWidth
        variant="text"
        size={isMobile ? "large" : "large"}
        sx={{
          py: { xs: 1.5, md: 1.5 },
          fontSize: { xs: '0.9rem', md: '1rem' },
          textTransform: 'none'
        }}
      >
        Login As Authority
      </Button>
    </Card>
  );
}