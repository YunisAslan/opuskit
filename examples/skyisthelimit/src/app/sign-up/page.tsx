import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignUp() {
  return (
    <section className="grid-24 gap-y-12 px-4 pt-40 pb-32 lg:px-8">
      <div className="col-span-24 md:col-span-7 md:col-start-2">
        <SectionHeader index="—" label="Sign up" as="h1">Keep a piece of the sky.</SectionHeader>
        <p className="mt-6 max-w-[40ch]">
          An account lets you save pieces from the archive and hear first when a new experiment goes up. Name, email,
          password — that’s all.
        </p>
      </div>
      <div className="col-span-24 flex flex-col gap-6 md:col-span-7 md:col-start-13">
        <AuthForm
          submit="Create account"
          fields={[
            { name: "name", label: "Name", type: "text", autoComplete: "name" },
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            { name: "password", label: "Password (8+ characters)", type: "password", autoComplete: "new-password", minLength: 8 },
          ]}
        />
        <Link href="/sign-in" className="t-utility link-fill self-start py-3">Already have an account? Sign in</Link>
      </div>
    </section>
  );
}
