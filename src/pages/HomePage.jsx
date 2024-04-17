import { useState, useEffect } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from '../components/Products';
import Search from '../components/Search';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    if (category !== '') {
      buttonSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const inputChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'category') setCategory(value);
    setSearch(value);
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

  const handleCategoryChange = ({ target }) => {
    const { value } = target;
    setCategory(value);
    setShowCategories(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buttonSearch();
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };

  const categoryWarning = selectedCategoryName && search !== '' && (
    <div className="alert alert-info alert-sm" style={{ fontSize: '0.8em', padding: '0.25rem 0.5rem' }}>
      Categoria selecionada: {selectedCategoryName}. Sua busca está acontecendo apenas nesta categoria. Se quiser uma busca geral, selecione a opção Todas as categorias
    </div>
  );

  return (
    <div className="container py-4 searchPage">
      <Search
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        buttonSearch={buttonSearch}
        handleKeyPress={handleKeyPress}
        handleCategoriesClick={handleCategoriesClick}
        handleCategoryChange={handleCategoryChange}
        inputChange={inputChange}
        handleCategorySelect={handleCategorySelect}
      />
      <ToastContainer />
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

export default HomePage;
