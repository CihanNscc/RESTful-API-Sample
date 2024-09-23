"use client";

import { SearchBox } from "@/components/search-box";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <nav className="flex w-full  max-w-2xl justify-between p-4">
        <h1 className="text-xl font-bold">Book Search</h1>
        <ModeToggle />
      </nav>
      <div className="mt-8 w-full flex flex-col items-center justify-center gap-y-8">
        <SearchBox />
      </div>
    </main>
  );
}
