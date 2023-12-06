'use client';
import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter, Raleway } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] })

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  },
  palette: {
    background: {
      default: '#E3EAF5',
      darker: '#d2ddef'
    }
  }
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <title>
          {
            (pathname === '/'
              ? 'Home'
              : pathname.replace('/', '').split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' '))
            + ' | DNA Storage Resources Page'
          }
        </title>
        <html lang="en">
          <body className={`${inter.className} ${raleway.className}`} style={{
            backgroundColor: '#E3EAF5',
            // backgroundColor: '#8EC5FC',
            // backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
            // backgroundColor: '#E3EAF5',
            // backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
          }}>
            <Box
              padding={2}>
              <NavBar />
              {children}
            </Box>
          </body>
        </html>
      </ThemeProvider>
    </SessionProvider>
  )
}
