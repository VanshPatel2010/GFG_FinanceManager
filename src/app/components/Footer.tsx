export default function Footer() {
    return (
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Capifynext. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms">Terms of Service</a>
          </li>
        </ul>
      </footer>
    );
  }
  