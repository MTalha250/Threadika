"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "@/components/ItemPage/slider";
import ReactLoading from "react-loading";
import Reviews from "@/components/ItemPage/reviews";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const { inWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { data, update } = useSession();
  const user = data?.user;
  const { addItem } = useCartStore();
  const router = useRouter();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const trouserLength = [
    {
      type: "Trouser Length",
      small: 36,
      medium: 37,
      large: 38,
    },
    {
      type: "Complete waist in round",
      small: 25,
      medium: 27,
      large: 30,
    },
    {
      type: "Hip",
      small: 19,
      medium: 24,
      large: 30,
    },
    {
      type: "Thigh Round",
      small: 26,
      medium: 30,
      large: 32,
    },
    {
      type: "Ankle",
      small: 7,
      medium: 7.5,
      large: 8,
    },
    {
      type: "Front Rise",
      small: 12.5,
      medium: 13,
      large: 13.5,
    },
    {
      type: "Back Rise",
      small: 15,
      medium: 15.5,
      large: 16.5,
    },
  ];
  const shirtLength = [
    {
      type: "Chest",
      small: 20,
      medium: 21.5,
      large: 23,
    },
    {
      type: "Shoulder",
      small: 14,
      medium: 14.5,
      large: 15.5,
    },
    {
      type: "Arm Hole",
      small: 8.5,
      medium: 9.5,
      large: 10.5,
    },
    {
      type: "Waist",
      small: 18,
      medium: 19,
      large: 20,
    },
    {
      type: "Sleeve Length",
      small: 21,
      medium: 21.5,
      large: 22,
    },
    {
      type: "Wrist",
      small: 5,
      medium: 5.5,
      large: 6,
    },
  ];
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      setProduct(response.data.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        cart: items,
      },
    });
  };
  const handleWishlistUpdate = async (wishlist: any) => {
    await update({
      ...data,
      user: {
        ...data?.user,
        wishlist: wishlist,
      },
    });
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="bars" color="#000000" width={100} />
    </div>
  ) : (
    <div className="pt-32 px-8 md:px-16 mb-10">
      <div className="flex flex-col md:flex-row">
        <Slider photos={product?.images} />
        <div className="mt-10 md:mt-0 w-full md:w-1/2 md:pl-10 bg-white">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            {product?.name}
          </h1>
          <p className="text-lg mb-2 text-gray-600">
            Price:{" "}
            <span className="font-bold text-primary">
              PKR{" "}
              {(
                product?.price -
                (product?.price * product?.discount) / 100
              ).toLocaleString()}
              {product?.discount > 0 && (
                <span className="line-through text-gray-500 text-sm ml-2">
                  PKR {product?.price.toLocaleString()}
                </span>
              )}
              {product?.discount > 0 && (
                <span className="text-green-500 text-sm ml-2">
                  {product?.discount}% off
                </span>
              )}
            </span>
          </p>
          <div className="flex gap-3 items-center">
            <p className="text-gray-600">Size:</p>
            <div className="flex gap-2">
              {product?.sizes.map((s: string) => (
                <button
                  key={s}
                  className={`px-3 py-1 text-sm border border-gray-300 ${
                    s == size ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setSize(s)}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <Drawer>
            <DrawerTrigger className="text-primary text-sm font-semibold mb-3 mt-1 underline hover:text-primary-dark transition duration-300">
              Size Chart
            </DrawerTrigger>
            <DrawerContent className="py-10 px-8 md:px-16 bg-white shadow-xl">
              <div className="h-[65vh] overflow-auto p-6 bg-gradient-to-b from-gray-50 to-white shadow-inner">
                <div className="flex flex-col md:flex-row gap-20 text-sm">
                  <div className="w-full">
                    <h2 className="text-xl font-semibold text-center mb-4 text-gray-500 underline">
                      Shirt Size Chart
                    </h2>
                    <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                            Small
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                            Medium
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                            Large
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shirtLength.map((item) => (
                          <tr
                            key={item.type}
                            className="hover:bg-gray-100 transition duration-300"
                          >
                            <td className="px-6 py-4 whitespace-nowrap font-semibold bg-gray-100">
                              {item.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.small}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.medium}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.large}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-semibold text-center mb-4 text-gray-500 underline">
                      Trouser Size Chart
                    </h2>
                    <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                            Small
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                            Medium
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                            Large
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {trouserLength.map((item) => (
                          <tr
                            key={item.type}
                            className="hover:bg-gray-100 transition duration-300"
                          >
                            <td className="px-6 py-4 whitespace-nowrap font-semibold bg-gray-100">
                              {item.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.small}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.medium}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {item.large}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 font-semibold mt-10 text-center italic">
                These size charts are for reference only. Actual measurements
                may vary from person to person, fabric to fabric, and fit-wise.
              </p>
            </DrawerContent>
          </Drawer>

          <div className="mb-5 flex gap-3 items-center">
            <p className="text-gray-600">Color:</p>
            <div className="flex gap-2">
              {product?.colors.map((c: string) => (
                <button
                  key={c}
                  className={`px-3 py-1 text-sm border border-gray-300 ${
                    c == color ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setColor(c)}
                >
                  {c[0].toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <hr className="mb-4 border-gray-200" />
          <div className="w-full flex gap-4 my-4">
            <button
              onClick={() => {
                if (user) {
                  if (inWishlist(id)) {
                    removeFromWishlist(id, user.id, handleWishlistUpdate);
                    toast.success("Removed from wishlist");
                  } else {
                    addToWishlist(
                      {
                        id,
                        images: product?.images,
                        name: product?.name,
                        price: product?.price,
                      },
                      user.id,
                      handleWishlistUpdate
                    );
                    toast.success("Added to wishlist");
                  }
                } else {
                  toast.error("Please login to add to wishlist");
                  router.push("/login");
                }
              }}
              className="group px-6 py-2 bg-white text-black font-bold transition duration-200 hover:bg-primary hover:text-white border-2 border-black hover:border-primary w-fit"
            >
              {inWishlist(id) ? (
                <MdFavorite className="group-hover:text-white text-2xl group-hover:scale-125 transition duration-200" />
              ) : (
                <MdFavoriteBorder className="text-2xl group-hover:scale-125 transition duration-200" />
              )}
            </button>
            {product?.stock > 0 && (
              <div className="flex items-center text-lg text-gray-800 border w-fit">
                <button
                  className="py-1 px-2"
                  disabled={count <= 1}
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  -
                </button>
                <span className="font-bold border-x py-1 px-2 inline-block">
                  {count}
                </span>
                <button
                  className="py-1 px-2"
                  disabled={count >= product?.stock}
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  +
                </button>
              </div>
            )}
            {product?.stock > 0 ? (
              <button
                onClick={() => {
                  if (user) {
                    if (!size && !color) {
                      toast.error("Please select size and color");
                      return;
                    }
                    if (!size) {
                      toast.error("Please select size");
                      return;
                    }
                    if (!color) {
                      toast.error("Please select color");
                      return;
                    }
                    for (let i = 0; i < count; i++) {
                      addItem(
                        {
                          id,
                          images: product?.images,
                          name: product?.name,
                          price:
                            product?.price -
                            (product?.price * product?.discount) / 100,
                          size,
                          color,
                        },
                        user.id,
                        handleUpdate
                      );
                    }
                    toast.success("Added to cart");
                    setSize("");
                    setColor("");
                  } else {
                    toast.error("Please login to add to cart");
                    router.push("/login");
                  }
                }}
                className="group bg-black items-center justify-center border border-primary px-6 py-2 font-medium text-black transition-colors"
              >
                <MdOutlineShoppingBag className="text-2xl text-white group-hover:scale-125 transition duration-200" />
              </button>
            ) : (
              <p className="group items-center justify-center border border-black bg-neutral-300 px-6 py-2 font-medium text-black transition-colors">
                Out of Stock
              </p>
            )}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {product?.description}
          </p>
          <hr className="my-4 border-gray-200" />
          {product?.fabric && (
            <p className="text-gray-700 leading-relaxed my-0.5">
              <span className="font-bold">Fabric: </span>
              {product?.fabric[0].toUpperCase() + product?.fabric.slice(1)}
            </p>
          )}
          {product?.trouser && (
            <p className="text-gray-700 leading-relaxed my-0.5">
              <span className="font-bold">Trouser: </span>
              {product?.trouser[0].toUpperCase() + product?.trouser.slice(1)}
            </p>
          )}
          {product?.inner && (
            <p className="text-gray-700 leading-relaxed my-0.5">
              <span className="font-bold">Inner: </span>
              {product?.inner[0].toUpperCase() + product?.inner.slice(1)}
            </p>
          )}
          {product?.dopatta && (
            <p className="text-gray-700 leading-relaxed my-0.5">
              <span className="font-bold">Dopatta: </span>
              {product?.dopatta[0].toUpperCase() + product?.dopatta.slice(1)}
            </p>
          )}
          {product?.embroidery && (
            <p className="text-gray-700 leading-relaxed my-0.5">
              <span className="font-bold">Embroidery: </span>
              {product?.embroidery[0].toUpperCase() +
                product?.embroidery.slice(1)}
            </p>
          )}
          {product?.weight > 0 && (
            <p className="text-gray-700 leading-relaxed my-0.5">
              <span className="font-bold">Weight: </span>
              {product?.weight} kg
            </p>
          )}

          <hr className="my-4 border-gray-200" />
          <p>
            <span className="font-bold">Category: </span>
            {product?.category[0].toUpperCase() + product?.category.slice(1)}
          </p>
        </div>
      </div>
      <Reviews
        reviews={product?.reviews}
        userEmail={user?.email || ""}
        onSubmitReview={async (review) => {
          try {
            await axios.put(`/api/product/${id}`, {
              reviews: [
                ...product.reviews,
                {
                  name: user?.name,
                  email: user?.email,
                  ...review,
                  created_at: new Date(),
                },
              ],
            });
            getProduct();
            toast.success("Review posted");
          } catch (error) {
            console.log(error);
          }
        }}
        onDeleteReview={async (index) => {
          try {
            const reviews = product.reviews;
            reviews.splice(index, 1);
            await axios.put(`/api/product/${id}`, {
              reviews,
            });
            getProduct();
            toast.success("Review deleted");
          } catch (error) {
            console.log(error);
          }
        }}
        className="mt-10"
      />
    </div>
  );
};

export default page;
