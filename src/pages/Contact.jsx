import '../styles/contact.css'
import Footer from '../components/Footer';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <div className="contact-page">
        <div className="content-container">
          <h2>Hubungi Kami</h2>
          <p>Saran dan Masukan anda sangat berarti. Anda dapat menghubungi Pengembang melalui tautan dibawah ini.</p>
          <div className="contact-methods">
            <a href="https://www.linkedin.com/in/aryadwira/" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaLinkedin className="contact-icon linkedin" />
              <h3>LinkedIn</h3>
              <p>@aryadwira</p>
            </a>
            
            <a href="mailto:aryadputra461@gmail.com" className="contact-item">
              <FaEnvelope className="contact-icon gmail" />
              <h3>Email</h3>
              <p>aryadputra461@gmail.com</p>
            </a>

            <a href="https://www.instagram.com/arya_dwira?igsh=MWtrcnVoZXJsYTEwaw==" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaInstagram className="contact-icon instagram" />
              <h3>Instagram</h3>
              <p>@arya_dwira</p>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact;