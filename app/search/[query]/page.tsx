"use client";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import Card from "@/components/card";
import { useParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { query } = useParams();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search/${query}`);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearch("");
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="pt-32 px-8 md:px-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">Search</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          You can search for products by name, description, color, or size.
        </p>
      </div>
      <div className="flex gap-3 sm:gap-10 w-full items-end">
        <h2 className="font-semibold shrink-0 border p-2 text-xs sm:text-sm">
          {products.length} {products.length > 1 ? "Products" : "Product"}
        </h2>
        <div className="flex items-end w-full gap-2">
          <input
            type="text"
            className="text-sm sm:text-base w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 p-2 fond-bold"
            placeholder="Search..."
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              search && e.key === "Enter" && router.push(`/search/${search}`)
            }
          />
          <button
            onClick={() => search && router.push(`/search/${search}`)}
            className="flex justify-center border py-1 border-black bg-transparent text-white  dark:border-white relative group transition duration-200"
          >
            <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
            <span className="flex items-center gap-1 relative text-sm font-semibold py-1 px-5">
              <BiSearchAlt className="sm:text-lg" />{" "}
              <span className="hidden md:inline">Search</span>
            </span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ReactLoading type="bars" color="#E17489" />
        </div>
      ) : products.length > 0 ? (
        <div>
          <h1 className="font-semibold text-lg sm:text-xl mt-10">
            Showing results for: "{decodeURIComponent(query.toString())}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5 mb-10">
            {products.map((product: any) => (
              <Card
                key={product._id}
                id={product._id}
                images={product.images}
                name={product.name}
                description={product.description}
                price={product.price}
                discount={product.discount}
                sizes={product.sizes}
                colors={product.colors}
                stock={product.stock}
                reviews={product.reviews}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[75vh] text-center text-lg text-gray-600 tracking-wide mt-10">
          <span>
            No products found for "{decodeURIComponent(query.toString())}". Try
            searching for something else.
          </span>
        </div>
      )}
    </div>
  );
};

export default page;
