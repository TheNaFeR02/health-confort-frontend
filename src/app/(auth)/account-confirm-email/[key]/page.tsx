import { Button, Box, Typography } from "@mui/material";
import { parseURL } from "@/utils/parseURL";
import Link from "next/link";
import { redirect } from "next/navigation";

async function validateEmail(key: string) {

  const body = JSON.stringify({
    key: key,
  });
  console.log(key);

  try {

    const res = await fetch(parseURL(`/api/auth/register/verify-email/`), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: body,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    redirect('/api/auth/error')
  }
}

export default async function ConfirmEmailByURL({ params }: { params: { key: string } }) {
  const decodedKey = decodeURIComponent(params.key);
  console.log("decodedKey", decodedKey)
  const data = await validateEmail(decodedKey);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={2}
      py={6}
      className="email-verified"
    >
      <Box textAlign="center" maxWidth="xl">
        <Typography variant="h3" gutterBottom>
          Heads Up!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your email account has been verified successfully. You can now login to your account. <span style={{ fontWeight: 500, color: '#3f51b5' }}>mail@yourdomain.com</span>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {decodedKey}
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Log in Now →
        </Button>
      </Box>
    </Box>
  );
}


