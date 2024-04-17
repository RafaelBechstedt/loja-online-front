import { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart = () => {
  const [shopping, setShopping] = useState([]);
  const [elementsId, setElementsId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const recoveryCart = JSON.parse(localStorage.getItem('cart')) || [];
    const ids = [...new Set(recoveryCart.map(({ id }) => id))];
    setShopping(recoveryCart);
    setElementsId(ids);
  }, []);

  useEffect(() => {
    const total = shopping.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [shopping]);

  const incrementItem = ({ target }) => {
    const item = shopping.find(({ id }) => target.name === id);
    const newShopping = [...shopping, item];
    setShopping(newShopping);
    localStorage.setItem('cart', JSON.stringify(newShopping));
  };

  const reduceItem = ({ target }) => {
    const validation = shopping.filter(({ id }) => id === target.name).length;
    if (validation !== 1) {
      const item = shopping.find(({ id }) => target.name === id);
      const index = shopping.indexOf(item);
      const products = shopping.filter((_, ind) => ind !== index);
      setShopping(products);
      localStorage.setItem('cart', JSON.stringify(products));
    }
  };

  const removeItem = ({ target }) => {
    const products = shopping.filter(({ id }) => id !== target.name);
    const ids = elementsId.filter((id) => id !== target.name);
    localStorage.setItem('cart', JSON.stringify(products));
    setShopping(products);
    setElementsId(ids);
    toast.success('Seu produto foi removido do carrinho', {
      position: "top-right",
    });
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setShopping([]);
    setElementsId([]);
    toast.success('Seu carrinho foi esvaziado', {
      position: "top-right",
    });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      {(!shopping.length) ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {elementsId.map((elemento) => {
            const products = shopping.filter(({ id }) => elemento === id);
            const [{ title, id, price, thumbnail }] = products;
            return (
              <CartItem
                key={id}
                title={title}
                price={price}
                image={thumbnail}
                quantity={products.length}
                incrementItem={incrementItem}
                id={id}
                reduceItem={reduceItem}
                removeItem={removeItem}
                clearCart={clearCart}
              />
            );
          })}
          <div className="row mt-4">
            <div className="col">
              <button
                className="btn btn-outline-danger"
                onClick={clearCart}
                type="button"
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <h5>Total: ${totalPrice.toLocaleString('pt-BR')}</h5>
            </div>
          </div>
        </>
      )}
      <div className="col-md-12 mt-3">
        <Link to="/" className="btn btn-secondary">
          Voltar à Página Principal
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
