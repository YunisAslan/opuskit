import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SectionHeader from "@/components/SectionHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Sign In" };

export default function SignIn() {
  return (
    <section className="grid-24 gap-y-12 px-4 pt-40 pb-32 lg:px-8">
      <div className="col-span-24 md:col-span-7 md:col-start-2">
        <SectionHeader index="—" label="Sign in" as="h1">Welcome back under the sky.</SectionHeader>
      </div>
      <div className="col-span-24 flex flex-col gap-6 md:col-span-7 md:col-start-13">
        <AuthForm
          submit="Sign in"
          fields={[
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
          ]}
        />
        <div className="t-utility flex flex-wrap justify-between gap-4">
          <a href={`mailto:${site.email}?subject=Reset%20my%20password`} className="link-fill py-3">Forgot password?</a>
          <Link href="/sign-up" className="link-fill py-3">New here? Create an account</Link>
        </div>
      </div>
    </section>
  );
}
