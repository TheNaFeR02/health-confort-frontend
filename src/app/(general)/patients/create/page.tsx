"use client"
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Patient, PatientSchema } from "../types/Patient";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import createPatient from "../services/createPatient";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import en from 'date-fns/locale/en-US';
import { ServerKnownError } from "@/errors/errors";
import { format, isValid, parse, parseISO } from "date-fns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";


type SnackbarState = {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string;
  type?: 'error' | 'success';
};

export default function CreatePatient() {
  const [birthdate, setBirthdate] = useState<string>('')
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/patients/create')
    }
  })

  const [snackbar, setSnackbar] = useState<SnackbarState>(
    {
      open: false,
      vertical: "top",
      horizontal: "center",
      message: ''
    }
  );

  const { vertical, horizontal, open, type } = snackbar;

  const { register, handleSubmit, formState: { errors }, control } = useForm<Patient>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      document_type: 'CC',
      document_id: '',
      email: '',
      phone: '',
      birthdate: new Date('1999-01-01'),
      marital_status: 'Single',
      blood_type: 'A+',
    },
  })

  const onSubmit: SubmitHandler<Patient> = async (data) => {
    console.log(data);

    try {
      await createPatient(data, session?.user.key);

      setSnackbar({ ...snackbar, open: true, message: 'Patient registered successfully', type: 'success' });

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        router.push('/patients');
      }, 2000);
    } catch (error) {
      console.log(error);
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
  }


  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  return (
    <>
      <Box sx={{ boxSizing: 'border-box' }}>
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
        <h1>Create Patient</h1>
        <Box sx={{ width: '13em', height: '13em', border: '1px solid black', borderRadius: '50%' }}>
        </Box>
        <h2>Patient Details</h2>
        <Box sx={{
          width: '100%', border: '1px solid black', borderRadius: '1.5em',

        }}>
          <Box component="form"
            // noValidate 
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex', flexDirection: 'column', gap: 3,
              mt: 3, p: '3em', '& .MuiInputLabel-root': {
                fontWeight: 'bold',
              },
            }}>

            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="name"
              autoFocus
              placeholder="Name"
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />

            <TextField
              autoComplete="family-name"
              required
              fullWidth
              id="last_name"
              autoFocus
              placeholder="Last Name"
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />

            <Controller
              name="document_type"
              control={control}
              defaultValue="CC"
              render={({ field }) =>
                <InputLabel sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} id="documentTypeLabel">Document Type
                  <Select
                    {...field}
                    labelId="documentTypeLabel"
                    id="documentType"
                    error={!!errors.document_type}
                  >
                    {["CC", "TI"].map((text, key) => (
                      <MenuItem key={key} value={text}>{text}</MenuItem>
                    ))}
                  </Select>

                </InputLabel>
              }
            >
            </Controller>

            <TextField
              sx={{ mt: 3 }}
              autoComplete="document-id"
              required
              fullWidth
              id="document_id"
              autoFocus
              placeholder="Document ID"
              {...register('document_id')}
              error={!!errors.document_id}
              helperText={errors.document_id?.message}
            />


            <Controller
              name="gender"
              control={control}
              defaultValue="Male"
              render={({ field }) =>
                <InputLabel sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} id="genderLabel">Gender
                  <Select
                    {...field}
                    labelId="genderLabel"
                    id="gender"
                    error={!!errors.gender}
                  >
                    {["Male", "Female"].map((text, key) => (
                      <MenuItem key={key} value={text}>{text}</MenuItem>
                    ))}
                  </Select>

                </InputLabel>
              }
            >
            </Controller>






            <TextField
              autoComplete="email"
              required
              fullWidth
              id="email"
              autoFocus
              placeholder="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              autoComplete="tel"
              required
              fullWidth
              id="phone"
              autoFocus
              placeholder="Phone"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
              <Controller
                name={"birthdate"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker value={value}
                    defaultValue={new Date('1999-01-01')}
                    onChange={onChange}
                    format="yyyy-MM-dd"
                  // onChange={(newValue) => {
                  //   if (newValue) {
                  //     const date = new Date(newValue)
                  //     if (isValid(date)) {
                  //       // Wed Feb 02 2220 00:00:00 GMT-0500 (hora estándar de Colombia)
                  //       const formattedDate = format(date, 'yyyy-MM-dd');
                  //       console.log(formattedDate); // Output: 2022-02-09
                  //       onChange(formattedDate);
                  //     }
                  //   }
                  // }}
                  // format="yyyy-MM-dd"

                  />
                )}
              />
            </LocalizationProvider>

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>

              <DatePicker
                value={birthdate}
                onChange={(newValue) => {
                  if (newValue) {
                    const date = new Date(newValue)
                    if (isValid(date)) {
                      // Wed Feb 02 2220 00:00:00 GMT-0500 (hora estándar de Colombia)
                      const formattedDate = format(date, 'yyyy-MM-dd');
                      console.log(formattedDate); // Output: 2022-02-09
                      setBirthdate(formattedDate);
                    }
                  }
                }}
              />

            </LocalizationProvider> */}



            <Controller
              name="marital_status"
              control={control}
              render={({ field }) =>
                <InputLabel sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} id="maritalStatusLabel">Marital Status
                  <Select
                    {...field}
                    labelId="maritalStatusLabel"
                    id="maritalStatus"
                    error={!!errors.marital_status}
                  >
                    {["Single", "Married", "Widowed", "Divorced", "Separated"].map((text, key) => (
                      <MenuItem key={key} value={text}>{text}</MenuItem>
                    ))}
                  </Select>

                </InputLabel>
              }
            >
            </Controller>

            <Controller
              name="blood_type"
              control={control}
              render={({ field }) =>

                <InputLabel sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} id="bloodTypeLabel">Blood Type
                  <Select
                    {...field}
                    labelId="bloodTypeLabel"
                    id="bloodType"
                    error={!!errors.blood_type}
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((text, key) => (
                      <MenuItem key={key} value={text}>{text}</MenuItem>
                    ))}
                  </Select>
                </InputLabel>
              }
            >
            </Controller>


            <Button type="submit" sx={{ mt: 3 }} variant="contained">
              Create Patient
            </Button>
          </Box>

        </Box >
      </Box >
    </>
  )
}