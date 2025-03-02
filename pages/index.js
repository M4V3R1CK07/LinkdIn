import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to home page
    if (status === "unauthenticated") {
      router.push("/home");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Show main content if authenticated
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <h1>Welcome to LinkedIn</h1>
      {session && (
        <div>
          <p>You are logged in as: {session.user.name}</p>
          {/* Your authenticated content here */}
        </div>
      )}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
