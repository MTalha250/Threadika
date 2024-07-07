import React from "react";
import { CiHeart } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/store/wishlistStore";
import WishlistItem from "./wishlistItem";

const Wishlist = () => {
  const { data, update } = useSession();
  const { wishlist, clearWishlist } = useWishlistStore();
  const user = data?.user;
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
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <CiHeart className="inline-block text-3xl hover:scale-125 transition duration-20" />
        {user && (
          <span className="text-white -top-2 -right-1 h-4 w-4 absolute bg-primary rounded-full p-0.5 text-[10px] flex justify-center items-center">
            {wishlist.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none w-screen max-w-[450px] h-[70vh] p-5">
        {user ? (
          <div className="w-full h-full">
            {wishlist.length ? (
              <div className="h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Wishlist</h2>
                  <button
                    onClick={() => clearWishlist(user?.id, handleUpdate)}
                    className="py-1 px-3 border border-black bg-transparent text-white dark:border-white relative group transition duration-200"
                  >
                    <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                    <span className="relative text-sm font-semibold">
                      Clear
                    </span>
                  </button>
                </div>
                <div className="flex flex-col justify-between h-full pt-3 pb-10 overflow-scroll">
                  <div>
                    {wishlist.map((item: any) => (
                      <WishlistItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={
                          item.images[0] ||
                          "https://via.placeholder.com/150?text=No+Image"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-lg lg:text-xl font-semibold">
                No items in wishlist
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-lg lg:text-xl font-semibold">
            Please login to view your wishlist
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Wishlist;
