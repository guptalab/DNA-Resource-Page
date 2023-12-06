'use client'
import { SessionProvider } from "next-auth/react"
import './../(pages)/globals.css'

const layout = ({ children }) => {
    return (
        <SessionProvider>
            <html>
                <body>
                    {children}
                </body>
            </html>
        </SessionProvider>
    )
}

export default layout