import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function MagicLinkSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <div className="flex items-center mx-auto justify-center size-14 rounded-full bg-primary/10 mb-4">
            <Mail className="size-8 text-primary" />
          </div>
          <CardTitle className="text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a magic link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Click the link in the email to sign in to your account. If you don't
            see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" variant="outline" asChild>
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
