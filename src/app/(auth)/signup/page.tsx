"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { z } from 'Zod'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/services/registerUser';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ServerKnownError } from '@/errors/errors';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const registerFormSchema = z.object({
  username: z.string()
    .min(1, { message: 'Username is required' })
    .max(100, { message: 'Username must be less than 100 characters' }),
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be less than 100 characters' }),
  confirmPassword: z.string()
    .min(1, { message: 'Confirm password is required' })
    .max(100, { message: 'Confirm password must be less than 100 characters' })
});

export type RegisterForm = z.infer<typeof registerFormSchema>;

type SnackbarState = {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string;
  type?: 'error' | 'success';
};

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema)
  });
  const router = useRouter();

  const [snackbar, setSnackbar] = React.useState<SnackbarState>(
    {
      open: false,
      vertical: "top",
      horizontal: "center",
      message: ''
    }
  );

  const { vertical, horizontal, open, type } = snackbar;


  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);

    try {
      // Handle successful registration
      const response = await registerUser(data);
      setSnackbar({ ...snackbar, open: true, message: 'User registered successfully', type: 'success' });

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } catch (error) {
      // Handle registration error
      // registerUser can return two types of errors:
      // 1. A server response error, which is a known error
      // 2. An unknown/generic error

      // 1. If there is a server response error, the custom error class has a property called serverErrors
      // which is an object containing the error messages from the server.
      if (error instanceof ServerKnownError) {
        if (error.serverErrors) {
          const errorMessage = error.serverErrors;
          let failureMessage = '';
          for (const key in errorMessage) {
            failureMessage += `${key}: ${errorMessage[key][0]}\n`;
          }
          setSnackbar({ ...snackbar, open: true, message: failureMessage, type: 'error' });
        }
      } else {
        // 2. Not known error
        console.error('Registration failed:', error);
        setSnackbar({ ...snackbar, open: true, message: 'Registration failed', type: 'error' });
      }
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', justifyContent: 'center', position: 'absolute' }}>
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={type === 'error' ? 'error' : 'success'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password1"
                autoComplete="new-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="new-password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}