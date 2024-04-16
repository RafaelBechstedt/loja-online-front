import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

const Categories = ({ inputChange, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

const handleInputChange = (event) => {
  const { value } = event.target;
  setSelectedCategory(value);
  inputChange(event);

  // Verificar se a opção "Todas as categorias" está selecionada
  if (value === '') {
    // Se "Todas as categorias" estiver selecionada, envie uma string vazia como o nome da categoria selecionada
    onCategorySelect('');
  } else {
    // Caso contrário, envie o nome da categoria selecionada
    const selectedCategoryObject = categories.find(cat => cat.id === value);
    if (selectedCategoryObject) {
      onCategorySelect(selectedCategoryObject.name);
    }
  }
};


  return (
    <form className="dropdown-form">
      <div className="form-check">
        <input
          className="form-check-input visually-hidden"
          type="radio"
          id="all-categories"
          name="category"
          value=""
          onChange={handleInputChange}
          checked={selectedCategory === ''}
        />
        <label
          className={`form-check-label category-label ${selectedCategory === '' ? 'selected' : ''}`}
          htmlFor="all-categories"
        >
          Todas as categorias
        </label>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="form-check">
          <input
            className="form-check-input visually-hidden"
            type="radio"
            id={category.id}
            name="category"
            value={category.id}
            onChange={handleInputChange}
            checked={selectedCategory === category.id}
          />
          <label
            className={`form-check-label category-label ${selectedCategory === category.id ? 'selected' : ''}`}
            htmlFor={category.id}
            style={{ cursor: 'pointer' }}
          >
            {category.name}
          </label>
        </div>
      ))}
    </form>
  );
};

Categories.propTypes = {
  inputChange: PropTypes.func,
  onCategorySelect: PropTypes.func.isRequired,
};

export default Categories;
