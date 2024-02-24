"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { z } from 'Zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { serverErrorSchema } from '@/types/serverError';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import { useSession } from 'next-auth/react'



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

const loginFormSchema = z.object({
  username: z.string()
    .min(1, { message: 'Username is required' })
    .max(100, { message: 'Username must be less than 100 characters' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be less than 100 characters' }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

type SnackbarState = {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string;
  type?: 'error' | 'success';
};

export default function SignIn() {
  const { register, handleSubmit, formState: { errors }, control, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema)
  })
  const router = useRouter()

  const [snackbar, setSnackbar] = React.useState<SnackbarState>(
    {
      open: false,
      vertical: "top",
      horizontal: "center",
      message: ''
    }
  );

  const { vertical, horizontal, open, type } = snackbar;

  // Executes onSubmit after form validation which is done using the schema.
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.log(data);
    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        // callbackUrl: 'http://localhost:3000/dashboard',
        redirect: false,
      })

      if (result?.ok) {
        setSnackbar({
          ...snackbar,
          open: true,
          message: 'User logged in successfully',
          type: "success"
        })
        setTimeout(() => {
        }, 1000)
        return router.push('/dashboard')
      }

      if (result?.error) {

        // We are using the serverErrorSchema to validate the error message from the server.
        // If the error message is not valid, we display a generic error message.
        // If the error message is valid, we display the error message from the server.
        const serverErrorMessage = serverErrorSchema.safeParse(JSON.parse(result.error))
        console.log("serverErrorMessage: ", serverErrorMessage)
        if (serverErrorMessage.success) {

          // Since django returns a list of errors, we join them into a single string and display them in the snackbar.
          const errors = serverErrorMessage.data.non_field_errors.join('\n')
          console.log("errors: ", errors)
          setSnackbar({
            ...snackbar,
            open: true,
            message: errors,
            type: "error"
          })
        }
      } else {
        setSnackbar({
          ...snackbar,
          open: true,
          message: 'An unexpected error occurred',
          type: "error"
        })
      }
    } catch (error) {
      console.log("error: ", error)
      setSnackbar({
        ...snackbar,
        open: true,
        message: 'An unexpected error occurred',
        type: "error"
      })
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const signInWithGoogle = async () => {
    console.log("signing in with google")
    signIn("google", {
      callbackUrl: "/google-callback",
      redirect: true,
    });
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
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
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
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
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              // name="email"
              autoComplete="username"
              autoFocus
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              // name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={signInWithGoogle}
            >
              <span><GoogleIcon />
              </span>             </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password-reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
            {/* <DevTool control={control} /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}