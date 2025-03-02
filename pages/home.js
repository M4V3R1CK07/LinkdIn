import Image from "next/image";
import Head from "next/head";
import linkdin_full from "../public/logos/linkdin_full.svg";
import linkdin_home from "../public/linkdin_home.svg";
import HeaderLink from "../components/HeaderLink.js";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PeopleIcon from "@mui/icons-material/People";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ExtensionIcon from "@mui/icons-material/Extension";
import { getProviders, signIn } from "next-auth/react";

function Home({ providers }) {
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkdIn: Log In or Sign Up</title>
        <link rel="icon" href="/logos/LinkdIn_Icon.png"></link>
      </Head>

      {/* Header Section */}
      <header className="flex justify-around items-center py-4">
        {/* Logo */}
        <div className="w-36 h-10 relative">
          <Image
            src={linkdin_full}
            alt="LinkedIn Full Logo"
            width={144} // Explicit width
            height={40} // Explicit height
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Navigation & Buttons */}
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={NewspaperIcon} text="Articles" />
            <HeaderLink Icon={PeopleIcon} text="People" />
            <HeaderLink Icon={OndemandVideoIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
            <HeaderLink Icon={ExtensionIcon} text="Games" />
          </div>
          <div className="space-x-4 px-2">
            <button
              className="font-semibold text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full hover:text-gray-800"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Join now
            </button>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  className="text-blue-600 font-semibold rounded-full border border-blue-600 px-6 py-3 transition-all hover:text-blue-900 hover:bg-blue-50"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in
                </button>
              ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        {/* Left Section */}
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-gray-700 text-3xl md:text-5xl max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
        </div>

        {/* Right Section - Image */}
        <div className="relative w-80 h-80 xl:w-[500px] xl:h-[500px]">
          <Image
            src={linkdin_home}
            alt="LinkedIn Home Image"
            width={500} // Explicit width
            height={500} // Explicit height
            style={{ objectFit: "cover", borderRadius: "10px" }} // Adjust as needed
            priority
          />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

//
//
//
//
// import Image from "next/image";
// import Head from "next/head";
// import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { getProviders } from "next-auth/react";
// import linkdin_full from "../public/logos/linkdin_full.svg";
// import linkdin_home from "../public/linkdin_home.svg";
// import HeaderLink from "../components/HeaderLink.js";
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import PeopleIcon from "@mui/icons-material/People";
// import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ExtensionIcon from "@mui/icons-material/Extension";
// import { SessionProvider } from "next-auth/react"; // ✅ Added SessionProvider

// function HomePage({ providers }) {
//   return (
//     <SessionProvider>
//       <ActualHome providers={providers} />
//     </SessionProvider>
//   );
// }

// function ActualHome({ providers }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { error } = router.query;

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-10 relative">
//       <Head>
//         <title>LinkdIn: Log In or Sign Up</title>
//         <link rel="icon" href="/logos/LinkdIn_Icon.png" />
//       </Head>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-md mt-4">
//           <p>Authentication error: {error}</p>
//           <button
//             className="underline mt-2"
//             onClick={() => signIn("linkedin", { callbackUrl: "/" })}
//           >
//             Try again
//           </button>
//         </div>
//       )}

//       <header className="flex justify-around items-center py-4">
//         <div className="relative w-36 h-10">
//           <Image
//             src={linkdin_full}
//             alt="LinkedIn Full Logo"
//             fill
//             style={{ objectFit: "contain" }}
//           />
//         </div>
//         <div className="flex items-center sm:divide-x divide-gray-300">
//           <div className="hidden sm:flex space-x-8 pr-4">
//             <HeaderLink Icon={NewspaperIcon} text="Articles" />
//             <HeaderLink Icon={PeopleIcon} text="People" />
//             <HeaderLink Icon={OndemandVideoIcon} text="Learning" />
//             <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
//             <HeaderLink Icon={ExtensionIcon} text="Games" />
//           </div>
//           <div className="space-x-4 px-2">
//             <button className="font-semibold text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full hover:text-gray-800">
//               Join now
//             </button>
//             {providers &&
//               Object.values(providers).map((provider) => (
//                 <button
//                   key={provider.id}
//                   className="text-blue-600 font-semibold rounded-full border border-blue-600 px-6 py-3 transition-all hover:text-blue-900 hover:bg-blue-50"
//                   onClick={() => signIn(provider.id, { callbackUrl: "/" })}
//                 >
//                   Sign in
//                 </button>
//               ))}
//           </div>
//         </div>
//       </header>

//       <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
//         <div className="space-y-6 xl:space-y-10">
//           <h1 className="text-gray-700 text-3xl md:text-5xl max-w-xl !leading-snug pl-4 xl:pl-0">
//             Welcome to your professional community
//           </h1>
//         </div>
//         <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
//           <Image
//             src={linkdin_home}
//             alt="LinkedIn Home Image"
//             fill
//             style={{ objectFit: "cover" }}
//             priority
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default HomePage;

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers: providers || {},
//     },
//   };
// }
