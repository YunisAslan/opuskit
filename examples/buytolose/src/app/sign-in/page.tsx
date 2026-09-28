import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PageIntro } from "@/components/Page";

export const metadata: Metadata = { title: "Sign In" };

export default function SignIn() {
  return (
    <>
      <PageIntro word="BACK" title="Sign in" />
      <AuthForm submit="Sign in"
        fields={[
          { id: "email", label: "Email", type: "email", autoComplete: "email" },
          { id: "password", label: "Password", type: "password", autoComplete: "current-password" },
        ]}
        footer={<>
          <p><Link className="link inline-flex min-h-11 items-center" href="/contact">Forgot your password?</Link></p>
          <p>New here? <Link className="link inline-flex min-h-11 items-center" href="/sign-up">Create an account</Link></p>
        </>} />
    </>
  );
}
