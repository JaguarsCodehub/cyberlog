'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, Loader, SaveIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface Params {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const ApiInput = ({ handleSubmit, isLoading }: Params) => {
    const [showApiKey, setShowApiKey] = useState(false);

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Access Your Data</CardTitle>
                    <CardDescription>Enter your API key to access one-time secret data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="key" className="text-foreground/80">
                                Secret API Key
                            </Label>
                            <div className="relative">
                                <Input
                                    id="key"
                                    name="key"
                                    type={showApiKey ? 'text' : 'password'}
                                    placeholder="Enter your API key"
                                    className="pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                                >
                                    {showApiKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader className="size-5 animate-spin mr-3" /> Loading...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="mr-2 h-4 w-4" /> Submit
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default ApiInput;
