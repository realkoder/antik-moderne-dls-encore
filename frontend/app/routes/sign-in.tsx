import { SignIn, SignInButton, SignUp } from "@clerk/react-router";
import type { Route } from "./+types/genres";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signin - Antik Moderne" },
    { name: "description", content: "Signin" },
  ];
}

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Sign in or up</h1>
      <SignUp />
      <SignIn />
      <SignInButton />
    </div>
  );
}
