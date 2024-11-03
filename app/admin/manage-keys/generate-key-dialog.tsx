import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface GenerateKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateKey: (user: string, secretData: string) => void;
}

export function GenerateKeyDialog({
  isOpen,
  onClose,
  onGenerateKey,
}: GenerateKeyDialogProps) {
  const [user, setUser] = useState("");
  const [secretData, setSecretData] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && secretData) {
      onGenerateKey(user, secretData);
      setUser("");
      setSecretData("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New API Key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user">User Email</Label>
            <Input
              type="email"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="secretData">Secret Data</Label>
            <Textarea
              id="secretData"
              value={secretData}
              onChange={(e) => setSecretData(e.target.value)}
              required
              className="mt-1"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Generate API Key</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
