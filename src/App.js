import {  useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Meals/MealsItem/Cart";
import CartProvider from "./Store/CartProvider";
function App() {
const[cartIsShown,setCartIsShown]=useState(false);

const showCartHandler=()=>{
  setCartIsShown(true);
}

const hideCartHandler=()=>{
  setCartIsShown(false);
}

  return (
    <CartProvider>
      {cartIsShown && < Cart onClose={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
