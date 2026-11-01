import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <LoaderCircle className="h-10 w-10 animate-spin text-[#4caf7d]" />
    </div>
  );
}
