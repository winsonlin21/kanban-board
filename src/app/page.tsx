import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Link href="/about">
        <Button>Go to About Page</Button>
      </Link>
    </main>
  );
}
