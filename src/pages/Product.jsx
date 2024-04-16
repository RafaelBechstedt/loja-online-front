import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdShoppingCart } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';



const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `https://api.mercadolibre.com/items/${id}`;
        const request = await fetch(url);
        const response = await request.json();
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addInCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Seu produto foi adicionado ao carrinho', {
      position: "top-right",
    });
  };

  const { title, price, thumbnail, attributes, warranty, seller_address } = product;

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={thumbnail}
            alt={title} className="img-fluid"
            style={{ width: '50%' }} />
        </div>
        <div className="col-md-6">
          <h2>{title}</h2>
          <h3>R$ {price}</h3>
          <ul>
            {attributes &&
              attributes.map((attribute) => (
                <li key={attribute.id}>{attribute.name}: {attribute.value_name}</li>
              ))}
          </ul>
          <p>{warranty}</p>
          <p>{seller_address?.state?.name ?? 'Endereço do vendedor não encontrado'}</p>
          <button type="button"
            className="btn btn-outline-primary"
            onClick={addInCart}>
            Adicionar ao Carrinho
          </button>
          <Link to="/ShoppingCart" style={{ marginLeft: '20px' }}>
            <MdShoppingCart size="2em" />
          </Link>
        </div>
      </div>
      <div className="col-md-12 mt-3">
        <Link to="/" className="btn btn-secondary">
          Voltar à Página Principal
        </Link>
      </div>
    </div>
  );
};

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Product;
