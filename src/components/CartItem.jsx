import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CartItem = ({
  image,
  title,
  price,
  quantity,
  id,
  incrementItem,
  reduceItem,
  removeItem
}) => {
  return (
    <div className="row mb-4">
      <div className="col-md-2">
        <Link
          to={`/product/${id}`}
          className="card-link"
          style={{ color: "inherit" }}
        >
          <img src={image} alt={title} className="img-fluid" />
        </Link>
      </div>
      <div className="col-md-6">
        <Link
          to={`/product/${id}`}
          className="card-link"
          style={{ color: "inherit" }}
        >
          <h5>{title}</h5>
        </Link>
        <p>${price.toLocaleString('pt-BR')}</p>
      </div>
      <div className="col-md-4">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={incrementItem}
              name={id}
              type="button"
            >
              +
            </button>
          </div>
          <div className="col">
            <p>{quantity}</p>
          </div>
          <div className="col">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={reduceItem}
              name={id}
              type="button"
            >
              -
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={removeItem}
              name={id}
              type="button"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  incrementItem: PropTypes.func,
  reduceItem: PropTypes.func,
  id: PropTypes.string,
  removeItem: PropTypes.func
};

export default CartItem;
