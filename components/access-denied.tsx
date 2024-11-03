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
import { AlertCircle, Home } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center mx-auto justify-center w-12 h-12 rounded-full bg-destructive/40 mb-4">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-center">Access Denied</CardTitle>
          <CardDescription className="text-center">
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            This area is restricted to authorized personnel only. If you believe
            you should have access, please contact your system administrator.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant={'secondary'} asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
