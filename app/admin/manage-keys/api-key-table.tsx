"use client";

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ApiKey, Prisma } from '@prisma/client';
import { Info, Trash2Icon } from 'lucide-react';

interface ApiKeyTableProps {
    apiKeys: ApiKey[];
}

export function ApiKeyTable({ apiKeys }: ApiKeyTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>UsedAt</TableHead>
                        <TableHead>Status</TableHead>
                        {/* <TableHead>Action</TableHead> */}
                        <TableHead>Data</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apiKeys.map(apiKey => (
                        <TableRow key={apiKey.id} className="cursor-pointer hover:bg-muted/20">
                            <TableCell className="font-mono">{apiKey.key}</TableCell>
                            <TableCell>{apiKey?.email}</TableCell>
                            <TableCell>{new Date(apiKey.createdAt).toLocaleString('en-IN')}</TableCell>
                            <TableCell>
                                {apiKey.used ? new Date(apiKey.updatedAt).toLocaleString('en-IN') : 'N/A'}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs  ${
                                        apiKey.used ? 'bg-yellow-800 text-yellow-100' : 'bg-emerald-800 text-green-200'
                                    }`}
                                >
                                    {apiKey.used ? 'used' : 'active'}
                                </span>
                            </TableCell>
                            {/* <TableCell>
                                <Button variant={'destructive'} size={'sm'}>
                                    <Trash2Icon className="size-4" />
                                </Button>
                            </TableCell> */}
                            <TableCell>
                                <Button onClick={() => alert(apiKey.data)} variant={'secondary'} size={'sm'}>
                                    <Info onClick={() => alert(apiKey.data)} className="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
