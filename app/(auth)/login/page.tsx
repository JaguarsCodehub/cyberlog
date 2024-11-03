import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Facebook, Loader, Mail } from "lucide-react";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import SubmitBtn from "@/components/ui/submit-btn";
import { CgGoogle } from "react-icons/cg";
import { FaGoogle } from "react-icons/fa";

interface PageProps {
  searchParams: {
    error?: string | boolean;
    message?: string;
    info?: string;
    callbackUrl?: string;
  };
}

export default function Page({
  searchParams: { error, message, info, callbackUrl },
}: PageProps) {
  const redirectTo = callbackUrl || "/dashbaord";

  const googleAction = async () => {
    "use server";
    await signIn("google", { redirectTo });
  };

  const emailAction = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;

    if (!email.endsWith("@gmail.com"))
      redirect(
        "/signin?error=invalid-email&message=Invalid email. Only Gmail is allowed."
      );

    await signIn("resend", { email, redirectTo });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <Card className="w-full md:w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form action={googleAction}>
              <SubmitBtn variant="secondary" className="w-full">
                <FaGoogle className="mr-2 h-4 w-4" />
                Sign in with Google
              </SubmitBtn>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form action={emailAction}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <SubmitBtn className="w-full mt-4">
                <Mail className="mr-2 h-4 w-4" />
                Send Magic Link
              </SubmitBtn>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
