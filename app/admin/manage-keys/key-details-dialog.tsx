import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ApiKey {
  id: number;
  key: string;
  user: string;
  createdAt: string;
  secretData: string;
  used: boolean;
  revoked: boolean;
  accessLog: { user: string; timestamp: string }[];
}

interface KeyDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: ApiKey | null;
  onUpdate: (updatedKey: ApiKey) => void;
  onRevoke: (keyId: number) => void;
}

export function KeyDetailsDialog({
  isOpen,
  onClose,
  apiKey,
  onUpdate,
  onRevoke,
}: KeyDetailsDialogProps) {
  const [editedSecretData, setEditedSecretData] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!apiKey) return null;

  const handleEdit = () => {
    setEditedSecretData(apiKey.secretData);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate({ ...apiKey, secretData: editedSecretData });
    setIsEditing(false);
  };

  const handleRevoke = () => {
    onRevoke(apiKey.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>API Key Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Key Information</h3>
            <p>
              <strong>Key:</strong> {apiKey.key}
            </p>
            <p>
              <strong>User:</strong> {apiKey.user}
            </p>
            <p>
              <strong>Created:</strong> {apiKey.createdAt}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {apiKey.revoked ? "Revoked" : apiKey.used ? "Used" : "Active"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Secret Data</h3>
            {isEditing ? (
              <Textarea
                value={editedSecretData}
                onChange={(e) => setEditedSecretData(e.target.value)}
                rows={4}
                className="w-full"
              />
            ) : (
              <p className="whitespace-pre-wrap">{apiKey.secretData}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Access Log</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKey.accessLog.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} disabled={apiKey.revoked}>
                Edit Secret Data
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={apiKey.revoked}>
                    Revoke Key
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently revoke
                      the API key.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRevoke}>
                      Revoke
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
