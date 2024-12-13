import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Capifynext</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/budget">Contact</Link>
        </li>
        <li>
          <Link href="/balance">Trackers</Link>
        </li>
      </ul>
    </nav>
  );
}
