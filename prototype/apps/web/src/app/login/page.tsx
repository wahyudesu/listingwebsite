import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-4">
      <h1 className="text-5xl font-bold tracking-tight">JobSearch</h1>
      <div className="w-full max-w-xl">
        <SearchBar autoFocus />
      </div>
    </main>
  );
}
