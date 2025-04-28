import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
// import './App.css';

const App = () => {
  const [predictionStatus, setPredictionStatus] = useState(null)
  
  return (
    <Router>
      <Header predictionStatus={predictionStatus} />
      <Routes>
        <Route path="/" element={<Home setPredictionStatus={setPredictionStatus} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
} 
export default App;
// App.jsx
// App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import About from './pages/About'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   )
// }