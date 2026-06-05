// import { Button } from "neetoui";
// import useCartItemsStore from "stores/useCartItemsStore";
// import { shallow } from "zustand/shallow";
// // import { useContext } from "react";
// // import { without } from "ramda";
// // import CartItemsContext from "src/contexts/CartItemsContext";

// const AddToCart = ({ slug }) => {
//   // const [cartItems, setCartItems] = useContext(CartItemsContext);
//   const { isInCart, toggleIsInCart } = useCartItemsStore(
//     store => ({
//       isInCart: store.cartItems.includes(slug),
//       toggleIsInCart: store.toggleIsInCart,
//     }),
//     shallow
//   );

//   const handleClick = e => {
//     e.stopPropagation();
//     e.preventDefault();
//     // setCartItems(prevCartItems =>
//     //   prevCartItems.includes(slug)
//     //     ? without([slug], cartItems)
//     //     : [slug, ...cartItems]
//     // );
//     toggleIsInCart(slug);
//   };

//   return (
//     <Button
//       // label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
//       label={isInCart ? "Remove from cart" : "Add to cart"}
//       size="large"
//       onClick={handleClick}
//     />
//   );
// };

// export default AddToCart;

import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug }) => {
  // const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
  //   paths([["cartItems", slug], ["setSelectedQuantity"]]),
  //   shallow
  // );
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug }} />;
};

export default AddToCart;
