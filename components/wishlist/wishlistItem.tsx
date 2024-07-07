import React from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSession } from "next-auth/react";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
}

const WishlistItem = ({ id, name, price, image }: Props) => {
  const { data, update } = useSession();
  const user = data?.user;
  const { removeFromWishlist } = useWishlistStore();
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        wishlist: items,
      },
    });
  };
  return (
    <Link
      href={`/products/${id}`}
      className="mt-2 flex items-center border-b border-gray-300 drop-shadow-sm py-2"
    >
      <img src={image} alt={name} className="w-20 h-20 mr-4 object-cover" />
      <div className="flex-1">
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-primary font-semibold text-sm">
          PKR {price.toLocaleString()}
        </p>
      </div>
      <button
        onClick={() => removeFromWishlist(id, user?.id, handleUpdate)}
        className="transition duration-300 flex justify-center items-center text-white bg-primary hover:bg-black w-5 h-5 rounded-full focus:outline-none"
      >
        <IoIosClose />
      </button>
    </Link>
  );
};

export default WishlistItem;
