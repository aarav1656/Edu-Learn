import "./globals.css";
import OCConnectWrapper from "../components/OCConnectWrapper";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  const opts = {
    redirectUri: "http://localhost:3000/courses",
    referralCode: "PARTNER6",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          <Navbar />
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Your App Name",
  description: "Your app description",
};
