"use client"
import { Suspense, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { z } from 'Zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import passwordResetEmail from "@/services/passwordResetEmail";
import { ServerKnownError } from "@/errors/errors";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

type SnackbarState = {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string;
  type?: 'error' | 'success';
};


const passwordResetEmailFormSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
});

export type PasswordResetEmailForm = z.infer<typeof passwordResetEmailFormSchema>;

export default function PasswordReset() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetEmailForm>({
    resolver: zodResolver(passwordResetEmailFormSchema),
  });

  const [snackbar, setSnackbar] = useState<SnackbarState>(
    {
      open: false,
      vertical: "top",
      horizontal: "center",
      message: ''
    }
  );

  const { vertical, horizontal, open, type } = snackbar;


  const onSubmit: SubmitHandler<PasswordResetEmailForm> = async (data) => {
    console.log(data);

    try {
      const response = await passwordResetEmail(data);

      setSnackbar({ ...snackbar, open: true, message: 'Password reset e-mail has been sent.\n Check your email!', type: 'success' });
    } catch (error) {
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
        console.error('There was an error password reset: ', error);
        setSnackbar({ ...snackbar, open: true, message: 'Failed password-reset', type: 'error' });
      }
    }
  }

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return <Container sx={{ height: '100%' }}>
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
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            // name="email"
            autoComplete="email"
            placeholder="Enter your email address to reset your password."
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message || 'Enter your email address to reset your password.'}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Copyright sx={{ mt: 5 }} />
          {/* <DevTool control={control} /> */}
        </Box>
      </Box>
    </Grid>

  </Container>
}