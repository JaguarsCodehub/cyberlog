import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmitBtn from "@/components/ui/submit-btn";
import { LogOut, Loader2 } from "lucide-react";

export default function Page() {
  const logoutAction = async () => {
    "use server";

    await signOut();
  };

  return (
    <div className="flex text-center items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
            <LogOut className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Logout</CardTitle>
          <CardDescription>Are you sure you want to log out?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Logging out will end your current session. You'll need to log in
            again to access your account.
          </p>
        </CardContent>
        <CardFooter>
          <form action={logoutAction} className="w-full">
            <SubmitBtn className="w-full" variant={"destructive"}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </SubmitBtn>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
