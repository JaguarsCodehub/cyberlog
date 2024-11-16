import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import SubmitBtn from "@/components/ui/submit-btn";
import { FaGoogle } from "react-icons/fa";
import { Shield, AlertCircle } from "lucide-react";

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
  const redirectTo = callbackUrl || "/dashboard";

  const googleAction = async () => {
    "use server";
    await signIn("google", { redirectTo });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4">
      <div className="mb-8 flex flex-col items-center text-center">
        <Shield className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Sign in to access your secure dashboard
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4 max-w-[350px]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {message || "There was an error signing in. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Continue with your corporate email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form action={googleAction}>
              <SubmitBtn 
                variant="secondary" 
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
              >
                <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
                Sign in with Company Email
              </SubmitBtn>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Important Note
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                This platform is exclusively for corporate users. Personal email addresses
                (Gmail, Yahoo, etc.) are not permitted. Please use your company-issued
                email address to sign in.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Need access? Contact your system administrator
      </p>
    </div>
  );
}
