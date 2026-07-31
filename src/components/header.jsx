import jsaLogo from '../assets/jsa-logo.png'
import './Header.css'

function Header() {
    return (
        <header className="site-header">
            <img src={jsaLogo} alt="JSA logo" className="logo" />

            <nav className="tabs">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#join">Join</a>
                <a href="#calendar">Calendar</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    )
}

export default Header