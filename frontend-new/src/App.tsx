import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useTheme } from "next-themes";

export default function App() {
  const { theme } = useTheme();
  
  return (
    <header
      className={`h-screen w-screen ${
        theme && theme === "dark" ? "bg-gray-700" : ""
      }`}
    >
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
