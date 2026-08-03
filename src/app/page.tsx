import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[85vh] px-8 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl">
        Education, Culture and Innovation
      </h1>
      <p className="mt-6 text-lg text-muted max-w-xl">
        MIRIT builds programs and platforms that connect learning, research, and community across borders.
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/gambia-project"
          className="bg-accent text-background px-6 py-3 rounded-full font-medium hover:opacity-80 transition-opacity"
        >
          See the Gambia Project
        </Link>
        <Link
          href="/about"
          className="border border-muted text-foreground px-6 py-3 rounded-full font-medium hover:border-foreground transition-colors"
        >
          About MIRIT
        </Link>
      </div>
    </main>
  );
}