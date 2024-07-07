import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { IoIosClose } from "react-icons/io";
interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

const CartItem = ({ id, name, price, image, size, color, quantity }: Props) => {
  const { data, update } = useSession();
  const user = data?.user;
  const { addItem, removeItem, deleteItem, addQuantity } = useCartStore(
    (state) => state
  );
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        cart: items,
      },
    });
  };
  return (
    <div className="mt-2 flex items-center border-b border-gray-300 drop-shadow-sm py-2">
      <img src={image} alt={name} className="w-20 h-20 mr-4 object-cover" />
      <div className="flex-1">
        <h3 className="font-bold">{name}</h3>
        <p className="text-primary font-semibold text-sm">
          PKR {price.toLocaleString()}
        </p>
        <span className="text-gray-600 text-xs">
          Size: {size.toUpperCase()} |
        </span>
        <span className="text-gray-600 text-xs">
          {" "}
          Color: {color[0].toUpperCase() + color.slice(1)}
        </span>
        <div className="flex items-center">
          <button
            onClick={() =>
              removeItem(id + size + color, user?.id, handleUpdate)
            }
            className="transition duration-300 flex justify-center items-center bg-primary hover:bg-black text-white rounded-full mr-2 focus:outline-none text-sm w-5 h-5"
          >
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={() =>
              addQuantity(id + size + color, user?.id, handleUpdate)
            }
            className="transition duration-300 flex justify-center items-center bg-primary hover:bg-black text-white rounded-full ml-2 focus:outline-none text-sm w-5 h-5"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => deleteItem(id + size + color, user?.id, handleUpdate)}
        className="transition duration-300 flex justify-center items-center text-white bg-primary hover:bg-black w-5 h-5 rounded-full focus:outline-none"
      >
        <IoIosClose />
      </button>
    </div>
  );
};

export default CartItem;
