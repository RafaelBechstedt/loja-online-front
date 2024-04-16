import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

const Categories = ({ inputChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  return (
    <form>
      {categories.map((category) => (
        <label key={category.id} htmlFor={category.id}>
          <input
            type="radio"
            id={category.id}
            name="category"
            value={category.id}
            onChange={inputChange}
          />
          {category.name}
        </label>
      ))}
    </form>
  );
};

Categories.propTypes = {
  inputChange: PropTypes.func,
};

export default Categories;
