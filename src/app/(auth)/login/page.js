// 'use client'
// import React from 'react'
// import { signIn, signOut, useSession } from 'next-auth/react';
// const LoginPage = () => {
//     return (
//         <div>LoginPage</div>
//     )
// }

// export default LoginPage
// "use client";

// import { signIn } from 'next-auth/react'
// import Image from 'next/image' // import the Image component from Next.js

// export default function SignInButton() {
//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: 'lightgrey',
//   };

//   const squareStyle = {
//     width: '500px',
//     height: '500px',
//     backgroundImage: 'url("/login_page.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     fontSize: '1.2em',
//     cursor: 'pointer',
//     display: 'flex', // added this line
//     alignItems: 'center', // added this line
//     gap: '10px', // added this line
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={squareStyle}>
//         <button style={buttonStyle} onClick={() => signIn("google")}>
//           <Image src="/google_logo.png" alt="Google Logo" width={24} height={24} /> {/* added this line */}
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { signIn } from 'next-auth/react'
// import Image from 'next/image' // import the Image component from Next.js

// export default function SignInButton() {
//   const containerStyle = {
//     display: 'flex',
//     height: '100vh',
//   };

//   const leftStyle = {
//     flex: 7, // changed this line
//     backgroundImage: 'url("/bg-01.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   };

//   const rightStyle = {
//     flex: 3, // changed this line
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'lightgrey',
//     padding: '2rem',
//   };

//   const welcomeStyle = {
//     marginBottom: '2rem',
//     fontSize: '1.5em',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     fontSize: '1.2em',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={leftStyle}></div>
//       <div style={rightStyle}>
//         <div style={welcomeStyle}>Welcome to our website</div>
//         <button style={buttonStyle} onClick={() => signIn("google")}>
//           <Image src="/google_logo.png" alt="Google Logo" width={24} height={24} />
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { Box, Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react'
import Image from 'next/image' // import the Image component from Next.js
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function SignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    backgroundColor: 'rgb(227, 234, 245)', // off-white background for the whole page
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '80%', // adjust as needed
    height: '80%', // adjust as needed
    backgroundColor: '#FFFFFF', // white background for the card
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', // increased shadow effect for the card
    borderRadius: '20px', // added this line for curved edges
  };

  const leftStyle = {
    flex: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/bg-04.jpg)',
    backgroundSize: 'contain', // changed this line
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', // added this line
  };

  const rightStyle = {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom right, #D3D3D3, #808080)', // gradient from light grey to dark grey
    color: '#000000', // text color is black for contrast
    padding: '2rem',
    borderTopRightRadius: '20px', // added this line
    borderBottomRightRadius: '20px', // added this line
  };


  const welcomeStyle = {
    marginBottom: '2rem',
    fontSize: '1.5em',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1.2em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '12px', // added this line for curved edges
  };

  return (
    <Box style={containerStyle}>
      <Box style={cardStyle}>
        <Box style={leftStyle}>
          {/* removed the img tag */}
        </Box>
        <Box style={rightStyle}>
          <Box style={welcomeStyle}>Welcome to our website</Box>
          <button style={buttonStyle} onClick={() =>
            signIn('google', {
              callbackUrl: callbackUrl,
            })
          }>
            <Image src="/google_logo.png" alt="Google Logo" width={24} height={24} />
            <Typography>Sign in with Google</Typography>
          </button>
        </Box>
      </Box>
    </Box >
  );
}
