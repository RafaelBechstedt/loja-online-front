import { Link } from 'react-router-dom';
import Categories from './Categories';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MdShoppingCart, MdSearch, MdMenu } from 'react-icons/md';

const Navbar = ({ search, showCategories, buttonSearch, handleKeyPress, handleCategoriesClick, handleCategoryChange, inputChange, handleCategorySelect }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ flex: '1' }}>
          <Link className="navbar-brand" to="/">Minha Loja</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Sobre</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Contato</Link>
            </li>
          </ul>
        </div>
        <form className="d-flex align-items-center" style={{ flex: '2' }} onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-3"
            type="search"
            placeholder="Digite o nome do produto..."
            aria-label="Search"
            value={search}
            onChange={inputChange}
            onKeyDown={handleKeyPress}
          />
          <button className="btn btn-outline-primary" type="button" onClick={buttonSearch}>
            <MdSearch />
          </button>
          <Link className="nav-link mx-3" to="/ShoppingCart">
            <MdShoppingCart size="2.3em" />
          </Link>
        
        <Dropdown show={showCategories} onClick={handleCategoriesClick}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <MdMenu className='menu-icon'/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Categories inputChange={handleCategoryChange} onCategorySelect={handleCategorySelect} />
          </Dropdown.Menu>
        </Dropdown>
        </form>
      </div>
      <br />
    </nav>
  );
};

Navbar.propTypes = {
  search: PropTypes.string.isRequired,
  showCategories: PropTypes.bool.isRequired,
  buttonSearch: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleCategoriesClick: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  handleCategorySelect: PropTypes.func.isRequired
};

export default Navbar;
