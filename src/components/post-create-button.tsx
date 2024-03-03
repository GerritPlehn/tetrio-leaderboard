"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";

type PostCreateButtonProps = ButtonProps;

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const createPost = api.post.create.useMutation();

  async function onClick() {
    setIsLoading(true);

    await createPost.mutateAsync({ name: "New post" });
    toast({
      title: "Wohoo.",
      description: "Your post was created.",
      variant: "default",
    });
    setIsLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={onClick}
      type="submit"
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  );
}
