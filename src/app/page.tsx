import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Link href="/countries">
        <Button>Go to country page</Button>
      </Link>
    </main>
  );
}
