'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Key, Loader2, Copy, CheckCircle, ArrowLeft, Home } from 'lucide-react';
import SubmitBtn from '@/components/ui/submit-btn';
import createKeyAction from '@/actions/createKeyAction';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ApiKeyGenerationPage() {
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedKey, setGeneratedKey] = useState<null | string | undefined>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedKey || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const data = form.data.value;

        const response = await createKeyAction({ email, data });

        if (response.ok) {
            toast.success('API key created successfully');
            setGeneratedKey(response?.key);
            form.reset();
        } else {
            toast.error(response?.message);
        }

        setIsLoading(false);
    };

    if (generatedKey) {
        return (
            <div className="min-h-[calc(100vh-8rem)] flex items-center">
                <Card className="mt-4 max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Generated API Key</CardTitle>
                        <CardDescription className="max-w-sm mt-2">
                            This is your new API key. Now you can copy and share this key with the user.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <code className="relative rounded bg-muted px-3 py-1 font-mono tracking-wide text-base font-semibold">
                                {generatedKey}
                            </code>
                            <Button variant="outline" size="icon" onClick={handleCopy}>
                                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center gap-6 justify-center">
                            <Button size="sm" onClick={() => setGeneratedKey(null)}>
                                <Home className="h-4 w-4 mr-4" />
                                Go to Dashboard
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setGeneratedKey(null)}>
                                <Key className="h-4 w-4 mr-4" />
                                Generate Another Key
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center">
            <Card className="max-w-lg w-full mx-auto">
                <form onSubmit={handleForm}>
                    <CardHeader>
                        <CardTitle>Generate New API Key</CardTitle>
                        <CardDescription>Create a new secret API key for user access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">User Email</Label>
                                <Input type="email" name="email" id="email" placeholder="user@example.com" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="secretData">Secret Data</Label>
                                <Textarea
                                    id="data"
                                    name="data"
                                    placeholder="Enter any additional secret data or notes"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <SubmitBtn pending={isLoading} type="submit">
                            <Key className="mr-2 h-4 w-4" />
                            Generate API Key
                        </SubmitBtn>
                    </CardFooter>
                </form>
            </Card>

            {/* {error && (
        <Alert variant="destructive" className="mt-4 max-w-2xl mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}
        </div>
    );
}
