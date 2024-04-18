import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = ({ product }) => {
  const { id, thumbnail, title, price } = product;

  const addInCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const trueCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(trueCart));
    toast.success('Seu produto foi adicionado ao carrinho', {
      position: "top-right",
    });
  };

  return (
    <div className="col-md-3 mb-4 col-sm col">
      <div className="card">
        <Link to={`/product/${id}`} className="card-link">
          <img src={thumbnail} alt={title} className="card-img-top" />
        </Link>
        <div className="card-body">
          <Link to={`/product/${id}`} className="card-link" style={{ color: "inherit" }}>
            <h5 className="card-title" style={{ fontSize: '16px' }}>{title}</h5>
          </Link>
          <p className="card-text">R$ {Math.floor(price).toLocaleString('pt-BR')}</p>
          <button type="button" className="btn btn-outline-primary" onClick={addInCart}>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Products;
