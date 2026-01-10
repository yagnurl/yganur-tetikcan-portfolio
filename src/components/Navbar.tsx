import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '2rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Portfolio
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/">Work</Link>
          <a href="mailto:contact@example.com">Contact</a>
        </div>
      </div>
    </nav>
  );
}
