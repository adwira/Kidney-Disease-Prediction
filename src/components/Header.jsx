import { NavLink } from 'react-router-dom'
import '../styles/header.css'

const Header = () => {
  return (
    <header>
      <nav>
        <h1>Kidney Disease Prediction</h1>
        <div className="nav-links">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </nav>
    </header>
  )
}
export default Header