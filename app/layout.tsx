import './globals.css'; import { ThemeProvider } from '@/components/theme-provider'; import { Navbar } from '@/components/navbar'; import { ChatWidget } from '@/components/chat-widget';
export const metadata={title:'NOVA — Intelligent Commerce',description:'AI-powered premium commerce platform'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ThemeProvider><Navbar/><main>{children}</main><ChatWidget/></ThemeProvider></body></html>}
