import '../styles/about.css'
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="about-page">
        <div className="content-container">
          <h2>Prediksi Penyakit Ginjal Kronis</h2>
          <p>
            Website ini menyediakan prediksi awal berbasis AI dan tidak menggantikan diagnosis dokter. Hasil yang diberikan merupakan perkiraan berdasarkan data terbatas dan membutuhkan konfirmasi lebih lanjut melalui pemeriksaan medis oleh profesional kesehatan. Konsultasikan hasil ini dengan dokter spesialis ginjal untuk evaluasi menyeluruh dan rencana penanganan yang tepat.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About;