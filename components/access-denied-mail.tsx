import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, Home } from 'lucide-react';

export default function AccessDeniedMailPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <Card className='w-[350px]'>
        <CardHeader>
          <div className='flex items-center mx-auto justify-center w-12 h-12 rounded-full bg-destructive/40 mb-4'>
            <AlertCircle className='w-6 h-6 text-destructive' />
          </div>
          <CardTitle className='text-center'>Company Email Required</CardTitle>
          <CardDescription className='text-center'>
            Personal email addresses are not allowed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-center text-sm text-muted-foreground'>
            This application is restricted to company email addresses only.
            Please sign in using your corporate email address. Personal email
            providers (Gmail, Yahoo, etc.) are not permitted.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant={'secondary'} asChild>
            <Link href='/login'>
              <Home className='mr-2 h-4 w-4' />
              Return to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
