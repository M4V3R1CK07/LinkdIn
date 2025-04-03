import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // If the current route is "/" then force the theme to "light", otherwise allow normal theme switching.
  const forcedTheme = router.pathname === "/" ? "light" : undefined;

  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <ThemeProvider attribute="class" forcedTheme={forcedTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
