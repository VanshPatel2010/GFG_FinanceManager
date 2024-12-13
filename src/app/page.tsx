import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Capifynext</h1>
        <p>Track your budget and balance with ease!</p>
        <Image 
          src="/hero-image.png" 
          alt="Hero image for Capifynext" 
          width={500} 
          height={300} 
        />
      </section>
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Budget Tracker</li>
          <li>Balance Tracker</li>
          <li>Intuitive Dashboard</li>
        </ul>
      </section>
    </div>
  );
}
