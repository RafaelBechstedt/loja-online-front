import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Products = ({ name, image, price, id }) => {
  return (
    <Link to={`/Product/${id}`}>
      <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{price}</p>
      </div>
    </Link>
  );
};

Products.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Products;
