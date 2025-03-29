import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"; // ✅ Import ThemeProvider
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
