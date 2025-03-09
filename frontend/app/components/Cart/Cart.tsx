import { useAtomValue } from "jotai";
import { cartPostersAtom } from "~/atoms/cartPostersAtom";
import { CartItem } from "./CartItem";


const Cart = () => {
  const cartPosters = useAtomValue(cartPostersAtom);

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-lg">Cart</h1>
      <div className="border-b w-[95%] mb-2" />

      {cartPosters.length < 1 && <p>no items</p>}

      {cartPosters.map((poster) => (
        <CartItem key={poster.id} poster={poster} />
      ))}

      <div className="border-b w-[95%] mb-2 mt-2" />

      <div className="w-full flex items-center justify-start">
        <button
          hidden={cartPosters.length < 1}
          className="border border-black  py-1 px-1.5 font-semibold drop-shadow-mg hover:cursor-pointer hover:scale-105 mt-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
