import './Header.css'
import logoAviato from '../../assets/Logo.png'

export const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logoAviato} alt="AVIATO" />
    </header>
  )
}
