import Modal from '../../Ui/Modal';
import React, { useContext,useState } from 'react';
import CartItem from '../../Cart/Cartitem';
import classes from './Cart.module.css';
import CartContext from '../../../Store/Cart-context';
import Checkout from '../../Cart/Checkout';

const Cart=(props)=>{

    const[isCheckout,setIsCheckout]=useState(false);
    const[isSubmitting,setIsSubmitting]=useState(false);
    const[didSubmit,setDidSubmit]=useState(false);

    const CartCtx=useContext(CartContext);

    const totalAmount=`$${CartCtx.totalAmount.toFixed(2)}`;

    const hasItems=CartCtx.items.length>0;

    const cartItemRemoveHandler=id=>{
        CartCtx.removeItem(id);
    };

    const CartItemAddHandler=item=>{
        CartCtx.addItem(item);
    };


const orederHandler=()=>{
setIsCheckout(true);
}

const submitHandler=async(userdata)=>{
    setIsSubmitting(true);
await fetch('https://react-http-a3fe1-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body:JSON.stringify({
        user:userdata,
        orderItems:CartCtx.items,
    })
})
setIsSubmitting(false);
setDidSubmit(true);
CartCtx.clearCart();
}

    const CartItems=(
    <ul className={classes['cart-items']}>
        {CartCtx.items.map((item)=><li>
        <CartItem 
        key={item.id}
         name={item.name} 
         amount={item.amount}
          price={item.price}
           onRemove={cartItemRemoveHandler.bind(null,item.id)}
           onAdd={CartItemAddHandler.bind(null,item)}
           ></CartItem>
    </li>)}</ul>
    )
const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orederHandler}>
          Order
        </button>
      )}
    </div>
  );

const cartModalContent=<React.Fragment> {CartItems}
<div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
</div>
{isCheckout&&(<Checkout onConfirm={submitHandler}  onCancel={props.onClose}></Checkout>)}
{!isCheckout&&modalActions}
</React.Fragment>

const isSubmittingModalContent=<p>Sending order data...</p>

const didSubmitModalContent=(
<React.Fragment>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
<button className={classes.button }onClick={props.onClose}>Close</button>
</div>
    </React.Fragment>
);

return ( 
 <Modal onClose={props.onClose}>
{!isSubmitting&&!didSubmit&& cartModalContent}
{isSubmitting&&isSubmittingModalContent}
{!isSubmitting&&didSubmit&&didSubmitModalContent}
</Modal>
)
}
export default Cart;