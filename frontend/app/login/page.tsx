import { redirect } from "next/navigation";

// Login is not used on the public site — redirect to home
export default function LoginPage() {
  redirect("/");
}
