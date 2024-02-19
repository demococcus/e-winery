import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './BasicNavbar.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function BasicNavbar () {

  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);

  const protectedLinks = (<>
    <NavLink to="/grapes" className="nav-link">
      {t('nav-grapes')}
    </NavLink>
    <NavLink to="/wines" className="nav-link">
      {t('nav-wines')}
    </NavLink>
    <NavLink to="/lab" className="nav-link">
      {t('nav-lab')}
    </NavLink>
    <NavLink to="/worksheets" className="nav-link">
      {t('nav-worksheets')}
    </NavLink>
    <NavLink to="/tanks" className="nav-link">
      {t('nav-tanks')}
    </NavLink>
    <NavLink to="/barrels" className="nav-link">
      {t('nav-barrels')}
    </NavLink>    
    <NavLink to="/additives" className="nav-link">
      {t('nav-additives')}
    </NavLink>    
  </>);

  const loginLink = (<>
    <NavLink to="/login" className="nav-link">
      {t('nav-login')}
    </NavLink>  
  </>);

  const userProfileLink = (<>
    <NavLink to="/me" className="nav-link">
      {userInfo?.name || t('nav-me')}
    </NavLink>
  </>);

  return (<>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/about" className="navbar-brand brand-black">
          {t('logo-e')}
          <span className="brand-red">{t('logo-winery')}</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userInfo && protectedLinks}
            <NavLink to="/about" className="nav-link">
              {t('nav-about')}
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            {userInfo ? userProfileLink : loginLink}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  </>);
}

export default BasicNavbar;