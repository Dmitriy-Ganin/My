import './Header.css'
import logoAviato from '../image/Logo.png'

export const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logoAviato} alt="AVIATO" />
    </header>
  )
}
