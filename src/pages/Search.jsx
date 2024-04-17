import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { MdShoppingCart, MdSearch, MdMenu } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from '../components/Products';

const Search = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  const inputChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'category') setCategory(value);
    setSearch(value);
  };

  useEffect(() => {
    if (category !== '') {
      buttonSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleCategoryChange = ({ target }) => {
    const { value } = target;
    setCategory(value);
    setShowCategories(false);
  };

  const buttonSearch = async () => {
    setLoading(true);
    const data = await getProductsFromCategoryAndQuery(category, search);
    setProducts(data.results);
    setLoading(false);
  };

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buttonSearch();
    }
  };

  const categoryWarning = selectedCategoryName && search !== '' && (
    <div className="alert alert-info alert-sm" style={{ fontSize: '0.8em', padding: '0.25rem 0.5rem' }}>
      Categoria selecionada: {selectedCategoryName}. Sua busca está acontecendo apenas nesta categoria. Se quiser uma busca geral, selecione a opção Todas as categorias
    </div>
  );

  return (
    <div className="container py-4 searchPage">
      <ToastContainer />
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
      {categoryWarning}
      {loading ? (
        <div className="spinner-border text-primary" role="status">
        </div>
      ) : null}
      <div className="row">
        {products.length !== 0 ? (
          products.map((product) => (
            <Products
            key={product.id}
            product={product}
          />
          ))
        ) : (
          <p className="col-md-12">Nenhum produto foi encontrado</p>
        )}
      </div>
    </div>
  );
};

export default Search;
