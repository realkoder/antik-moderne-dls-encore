import { MdRemoveCircle } from "react-icons/md";

const Cart = () => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-lg">Cart:</h1>
      <div className="border-b w-[95%] mb-2" />
      {/* Cart item */}
      <div className="relative flex items-center justify-start w-full mt-2">
        <MdRemoveCircle className="absolute -left-1 -top-1 bg-white rounded-full w-4 h-4 text-red-500 cursor-pointer font-semibold z-50" />
        <img src="/poster-mock.png" className="rounded-md w-12 h-12" />
        <div className="flex flex-col items-start justify-start w-full ml-2">
          <h2 className="text-sm font-semibold">Poster Title</h2>
          <h2 className="text-sm">Format</h2>
        </div>
        <p className="text-xs">Price DKK,-</p>
      </div>
      <div className="border-b w-[95%] mb-2 mt-2" />

      <div className="w-full flex items-center justify-start">
        <button className="border border-black bg-white py-1 px-1.5 font-semibold drop-shadow-mg hover:cursor-pointer hover:scale-105 mt-2">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
