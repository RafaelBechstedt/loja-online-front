import { Link } from 'react-router-dom';
import Categories from './Categories';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MdShoppingCart, MdSearch, MdMenu } from 'react-icons/md';

const Search = ({ search, showCategories, buttonSearch, handleKeyPress, handleCategoriesClick, handleCategoryChange, inputChange, handleCategorySelect }) => {


  return (
    <div className="container py-4 searchPage">
      <div className="row mb-4 justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pesquisa de Produtos</h1>
          <div className="input-group">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Digite o nome do produto..."
              value={search}
              onChange={inputChange}
              onKeyDown={handleKeyPress}
              size={40}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={buttonSearch}
            >
              <MdSearch size="1.4em" />
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <Link to="/ShoppingCart">
            <MdShoppingCart size="2.5em" />
          </Link>
        </div>
      </div>
      <Dropdown show={showCategories} onClick={handleCategoriesClick}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <MdMenu />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Categories inputChange={handleCategoryChange} onCategorySelect={handleCategorySelect} />
        </Dropdown.Menu>
      </Dropdown>
      <br />
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  showCategories: PropTypes.bool.isRequired,
  setShowCategories: PropTypes.func.isRequired,
  buttonSearch: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleCategoriesClick: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  handleCategorySelect: PropTypes.func.isRequired
};
export default Search;
