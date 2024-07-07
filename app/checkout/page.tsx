"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
  city: z
    .string()
    .min(3, { message: "City must be at least 3 characters long" }),
  country: z
    .string()
    .min(3, { message: "Country must be at least 3 characters long" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal code must be at least 3 characters long" }),
});
const page = () => {
  const { data, update } = useSession();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter();
  const user = data?.user;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      city: "",
      country: "",
      postalCode: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleUpdate = async (items: any) => {
    await update({
      ...data,
      user: {
        ...user,
        cart: items,
      },
    });
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/order", {
        user: user?.id,
        orderItems: items.map((item) => ({
          quantity: item.quantity,
          product: item.id,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: {
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
        paymentMethod,
        itemsPrice: getTotalPrice(),
        delivery: getTotalPrice() > 5000 ? 0 : 250,
        totalPrice: getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 250),
      });
      toast.success(response.data.message);
      clearCart(user?.id, handleUpdate);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSubmitting(false);
    form.reset();
  }

  useEffect(() => {
    if (!user?.email || items.length === 0) {
      router.push("/");
    }
  }, [user, items]);

  return (
    <div className="px-8 md:px-16 pt-32 pb-10 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
        <p className="mt-4 text-lg text-gray-700">
          Fill in your details to place your order. We will deliver it to you as
          soon as possible.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <h2 className="text-xs font-bold">Personal Info</h2>
              <div className="border-y py-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <h2 className="text-xs font-bold">Payment Info:</h2>
              <div className="border-y py-5">
                <RadioGroup
                  defaultValue={paymentMethod}
                  onValueChange={(e) => setPaymentMethod(e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank Transfer</Label>
                  </div>
                  {paymentMethod == "bank" && (
                    <div className="my-1 p-2  border border-black">
                      <p className="text-xs">
                        Account Name: ZANIB ASHFAQ
                        <br />
                        Bank: Meezan Bank
                        <br />
                        Account: 02810109206117
                        <br />
                        IBAN: PK92MEZN0002810109206117
                      </p>
                      <p className="text-xs mt-2 font-semibold">
                        Note: <br />
                        After making the payment, please send the screenshot of
                        the transaction to our WhatsApp number: <br />
                        <a
                          href="https://wa.me/923214087600"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          +92 321 4087600
                        </a>
                      </p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="rounded-none  font-bold w-full bg-transparent hover:bg-transparent py-3 border border-black text-white dark:border-white relative group transition duration-200"
              >
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative">
                  {isSubmitting ? "Submitting..." : "Place Order"}
                </span>
              </Button>
            </form>
          </Form>
        </div>
        <div className="md:pl-10 w-full md:border-l border-neutral-600">
          <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-black p-2 my-2 flex justify-between"
            >
              <div className="w-2/3">
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-20 h-20 object-cover float-left mr-3.5"
                />
                <h1 className="font-semibold text-sm">{item.name}</h1>
                <h1 className="text-xs">Size: {item.size.toUpperCase()}</h1>
                <h1 className="text-xs">
                  Color: {item.color[0].toUpperCase() + item.color.slice(1)}
                </h1>
                <h1 className="text-xs">Qty: {item.quantity}</h1>
              </div>
              <span className="text-sm font-bold">
                {item.price.toLocaleString()} PKR
              </span>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{getTotalPrice().toLocaleString()} PKR</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>
                {getTotalPrice() > 5000 ? (
                  <span className="font-semibold text-green-600">Free</span>
                ) : (
                  "250 PKR"
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>
                {(
                  getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 250)
                ).toLocaleString()}{" "}
                PKR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
