import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <Link href="/" className="font-bold text-lg">MIRIT</Link>
      <div className="flex gap-6 text-sm">
        <Link href="/services">Services</Link>
        <Link href="/gambia-project">Gambia Project</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
