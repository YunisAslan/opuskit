import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PageIntro } from "@/components/Page";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignUp() {
  return (
    <>
      <PageIntro word="JOIN" title="Create an account">Track orders, return in two clicks and hear about the next run a day before everyone else.</PageIntro>
      <AuthForm submit="Create account"
        fields={[
          { id: "email", label: "Email", type: "email", autoComplete: "email" },
          { id: "password", label: "Password (8+ characters)", type: "password", autoComplete: "new-password" },
        ]}
        footer={<p>Already have one? <Link className="link inline-flex min-h-11 items-center" href="/sign-in">Sign in</Link></p>} />
    </>
  );
}
