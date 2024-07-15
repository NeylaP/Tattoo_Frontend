import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
   return (
      <Typography variant="body2" color="text.secondary">
         {'Copyright © '}
         <Link href="https://mui.com/">Sitemark&nbsp;</Link>
         {new Date().getFullYear()}
      </Typography>
   );
}

export default function Footer() {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            borderTop: '1px solid',
            borderColor: 'divider',
         }}
      >
         <div>
            <Link color="text.secondary" href="#">
               Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
               &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" href="#">
               Terms of Service
            </Link>
            <Copyright />
         </div>
         <Box>
            <IconButton
               color="inherit"
               href="https://github.com/mui"
               aria-label="GitHub"
            >
               <GitHubIcon />
            </IconButton>
            <IconButton
               color="inherit"
               href="https://x.com/MaterialUI"
               aria-label="X"
            >
               <TwitterIcon />
            </IconButton>
            <IconButton
               color="inherit"
               href="https://www.linkedin.com/company/mui/"
               aria-label="LinkedIn"
            >
               <LinkedInIcon />
            </IconButton>
         </Box>
      </Box>
   );
}
