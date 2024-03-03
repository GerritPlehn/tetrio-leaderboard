"use client";
import * as React from "react";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type TetrioReplay, tetrioReplaySchema } from "types/tetrio-replay";

export function ScoreSubmitButton() {
  const [replay, setReplay] = React.useState<TetrioReplay | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileContent = reader.result?.toString();
      if (!fileContent) return;
      try {
        setReplay(tetrioReplaySchema.parse(JSON.parse(fileContent)));
      } catch (error) {
        console.log(error);
        toast({
          title: "Invalid Replay",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              This is not a valid replay file
            </pre>
          ),
        });
        return;
      }
    };
    reader.readAsText(file);
  };

  function onSubmit() {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{replay?.endcontext.score}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Submit Score</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Score</DialogTitle>
          <DialogDescription>
            Submit a score to the leaderboards.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="replay" className="text-right">
              Replay
            </Label>
            <Input
              id="replay"
              type="file"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={!replay} onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
