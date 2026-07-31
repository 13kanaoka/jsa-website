import jsaLogo from '../assets/jsa-logo.png'
import './Header.css'

function Header() {
    return (
        <header className="site-header">
            <a href="#home" className="brand">
                <img src={jsaLogo} alt="JSA logo" className="logo" />
            </a>

            <nav className="tabs">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#join">Join</a>
                <a href="#calendar">Calendar</a>
                <a href="#faq">FAQ</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    )
}

export default Header
