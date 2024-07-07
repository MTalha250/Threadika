"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import MultiRangeSlider from "multi-range-slider-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import ReactLoading from "react-loading";
import { CiFilter } from "react-icons/ci";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [filters, setFilters] = useState({
    formals: false,
    semiFormals: false,
    premium: false,
    price: {
      min: 100,
      max: 100000,
    },
  });
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/product");
      setProducts(response.data.products);
      setFilters({
        formals: false,
        semiFormals: false,
        premium: false,
        price: {
          min: 100,
          max: 100000,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/filters", filters);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-8 md:px-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">All products</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Explore our diverse range, from formal wear to casual attire. Find the
          perfect outfit for any occasion.
        </p>
      </div>

      <div className="flex my-10">
        <div className="hidden md:block md:w-1/4 lg:w-1/5 shrink-0 pr-5">
          <h1 className="font-bold text-2xl text-center mb-5">Filters</h1>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={filters.premium}
              onCheckedChange={() =>
                setFilters({ ...filters, premium: !filters.premium })
              }
            />
            <h2 className="font-semibold">Premium</h2>
          </label>
          <label className="flex items-center gap-2 my-2">
            <Checkbox
              checked={filters.formals}
              onCheckedChange={() =>
                setFilters({ ...filters, formals: !filters.formals })
              }
            />
            <h2 className="font-semibold">Formals</h2>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={filters.semiFormals}
              onCheckedChange={() =>
                setFilters({ ...filters, semiFormals: !filters.semiFormals })
              }
            />
            <h2 className="font-semibold">Semi-Formals</h2>
          </label>

          <p className="mt-5 font-semibold text-sm">Price Range (PKR):</p>
          <MultiRangeSlider
            min={100}
            minValue={filters.price.min}
            max={100000}
            maxValue={filters.price.max}
            onChange={(e) =>
              setFilters({
                ...filters,
                price: {
                  min: e.minValue,
                  max: e.maxValue,
                },
              })
            }
            step={100}
            stepOnly
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="#E1E1E1"
            barInnerColor="#000000"
            barRightColor="#E1E1E1"
            thumbLeftColor="white"
            thumbRightColor="white"
          />
          <div className="flex mt-5 gap-3 justify-end">
            <button
              onClick={getProducts}
              className="flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
            >
              <div className="absolute bottom-0 right-0 bg-neutral-200 h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative text-sm font-semibold py-1 px-2">
                Clear
              </span>
            </button>
            <button
              onClick={handleFilter}
              className=" flex justify-center border py-1 border-black bg-transparent text-white dark:border-white relative group transition duration-200"
            >
              <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative text-sm font-semibold py-1 px-2">
                Apply
              </span>
            </button>
          </div>
        </div>
        <div className="md:border-l md:pl-5 w-full">
          <div className="flex gap-3 sm:gap-10 w-full items-end">
            <h2 className="font-semibold shrink-0 border p-2 text-xs sm:text-sm">
              {products.length} {products.length > 1 ? "Products" : "Product"}
            </h2>
            <div className="flex items-end w-full gap-2">
              <input
                type="text"
                className="text-sm sm:text-base w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 p-2 fond-bold"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) =>
                  search &&
                  e.key === "Enter" &&
                  router.push(`/search/${search}`)
                }
              />
              <button
                disabled={!search}
                onClick={() => router.push(`/search/${search}`)}
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
          <Sheet>
            <SheetTrigger className="md:hidden flex items-center gap-2 mt-5 ml-auto border border-black py-1 px-2">
              <CiFilter className="text-xl" />
              <span className="font-semibold text-sm">Filters</span>
            </SheetTrigger>
            <SheetContent>
              <h1 className="font-bold text-2xl text-center mb-5">Filters</h1>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.premium}
                  onCheckedChange={() =>
                    setFilters({ ...filters, premium: !filters.premium })
                  }
                />
                <h2 className="font-semibold">Premium</h2>
              </label>
              <label className="flex items-center gap-2 my-2">
                <Checkbox
                  checked={filters.formals}
                  onCheckedChange={() =>
                    setFilters({ ...filters, formals: !filters.formals })
                  }
                />
                <h2 className="font-semibold">Formals</h2>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.semiFormals}
                  onCheckedChange={() =>
                    setFilters({
                      ...filters,
                      semiFormals: !filters.semiFormals,
                    })
                  }
                />
                <h2 className="font-semibold">Semi-Formals</h2>
              </label>

              <p className="mt-5 font-semibold text-sm">Price Range (PKR):</p>
              <MultiRangeSlider
                min={100}
                minValue={filters.price.min}
                max={100000}
                maxValue={filters.price.max}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: {
                      min: e.minValue,
                      max: e.maxValue,
                    },
                  })
                }
                step={100}
                stepOnly
                ruler={false}
                style={{
                  border: "none",
                  boxShadow: "none",
                  padding: "15px 10px",
                }}
                barLeftColor="#E1E1E1"
                barInnerColor="#1c1c1c"
                barRightColor="#E1E1E1"
                thumbLeftColor="white"
                thumbRightColor="white"
              />
              <div className="flex mt-5 gap-3 justify-end">
                <SheetClose
                  onClick={getProducts}
                  className="flex justify-center border py-1 border-black bg-transparent text-black  dark:border-white relative group transition duration-200"
                >
                  <div className="absolute bottom-0 right-0 bg-neutral-200 h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                  <span className="relative text-sm font-semibold py-1 px-2">
                    Clear
                  </span>
                </SheetClose>
                <SheetClose
                  onClick={handleFilter}
                  className="flex justify-center border py-1 border-black bg-transparent text-white  dark:border-white relative group transition duration-200"
                >
                  <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                  <span className="relative text-sm font-semibold py-1 px-2">
                    Apply
                  </span>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <ReactLoading type="bars" color="#E17489" />
            </div>
          ) : products.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 mb-10">
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
            <div className="flex justify-center items-center h-[60vh] text-center text-lg text-gray-600 tracking-wide mt-10">
              <span>No Products Found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
