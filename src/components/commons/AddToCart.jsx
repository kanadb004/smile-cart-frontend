import { Button } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";
// import { useContext } from "react";
// import { without } from "ramda";
// import CartItemsContext from "src/contexts/CartItemsContext";

const AddToCart = ({ slug }) => {
  // const [cartItems, setCartItems] = useContext(CartItemsContext);
  const { isInCart, toggleIsInCart } = useCartItemsStore(
    store => ({
      isInCart: store.cartItems.includes(slug),
      toggleIsInCart: store.toggleIsInCart,
    }),
    shallow
  );

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    // setCartItems(prevCartItems =>
    //   prevCartItems.includes(slug)
    //     ? without([slug], cartItems)
    //     : [slug, ...cartItems]
    // );
    toggleIsInCart(slug);
  };

  return (
    <Button
      // label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
