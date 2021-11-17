import React, { useState } from 'react';
import Carts from './components/Carts/Carts';
import Headers from './components/Layouts/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartsListHandler = () => {
    setIsCartShown(true);
  };

  const hideCartsListHandler = () => {
    setIsCartShown(false);
  };

  return (
    <CartProvider>
      {isCartShown && <Carts onClose={hideCartsListHandler} />}
      <Headers onShowCart={showCartsListHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
