import type { Metadata } from "next"
import { AuthShell } from "@/components/AuthShell"
import { SignInForm } from "@/components/AuthForms"

export const metadata: Metadata = { title: "Sign in" }

export default function SignInPage() {
  return (
    <AuthShell label="Sign in" lines={["Welcome back"]} points={["See your RSVP and party size", "Download shuttle and parking passes", "Change or cancel up to 48 hours before"]}>
      <SignInForm />
    </AuthShell>
  )
}
