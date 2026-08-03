import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-background text-foreground">
      <Link href="/" className="font-bold text-lg tracking-tight">MIRIT</Link>
      <div className="flex gap-6 text-sm text-muted">
        <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
        <Link href="/gambia-project" className="hover:text-foreground transition-colors">Gambia Project</Link>
        <Link href="/articles" className="hover:text-foreground transition-colors">Articles</Link>
        <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
      </div>
    </nav>
  );
}