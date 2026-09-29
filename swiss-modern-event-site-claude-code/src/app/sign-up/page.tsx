import type { Metadata } from "next"
import { AuthShell } from "@/components/AuthShell"
import { SignUpForm } from "@/components/AuthForms"

export const metadata: Metadata = { title: "Create account" }

export default function SignUpPage() {
  return (
    <AuthShell label="Create account" lines={["One account,", "every reply"]} points={["Reply for all three days in one place", "Keep guest names and access needs on file", "Hotel rates and passes arrive here first"]}>
      <SignUpForm />
    </AuthShell>
  )
}
