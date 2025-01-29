"use client";

import { Button } from "../ui/button";

const RevalidateCacheButton = () => {
  const revalidateCache = async () => {
    await fetch("/api/next-cache", {
      method: "POST",
    });
  };
  return (
    <Button onClick={revalidateCache} className="mb-4">
      Revalidate Cache
    </Button>
  );
};

export default RevalidateCacheButton;
