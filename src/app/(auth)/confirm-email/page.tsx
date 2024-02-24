"use client"
import React from 'react';
import { Box, Typography, Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Collapse, IconButtonProps,  } from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ConfirmEmail() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <div style={{ margin: '25%' }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                HC
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Health Confort"
            subheader="<no-reply>@healthconfort.com"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              We have sent a confirmation email to your account. Please check your email and follow the instructions to verify your account.
            </Typography>
            <Typography variant="body2" color="text.secondary"> <Link href="/signin">Go back to SignIn!</Link></Typography> 
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>About Health Confort</Typography>
              <Typography paragraph>
                Health Confort is a leading provider of health and wellness services. We are committed to improving the health and well-being of our customers by providing innovative, high-quality care.
              </Typography>
              <Typography paragraph>
                Our services range from general health check-ups and consultations to specialized treatments and therapies. We strive to provide a comfortable and welcoming environment for all our customers.
              </Typography>
              <Typography paragraph>
                We believe that everyone deserves access to quality healthcare, and we are committed to making that a reality for our customers. Thank you for choosing Health Confort.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </Box>
  );
}

export default ConfirmEmail;