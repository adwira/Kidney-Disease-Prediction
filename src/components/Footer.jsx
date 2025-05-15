import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Kidney Disease Prediction. SIMKES KHANZA.</p>
        <div className="footer-links">
          <a href="/about">Tentang Kami</a>
          <a href="/contact">Kontak</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 