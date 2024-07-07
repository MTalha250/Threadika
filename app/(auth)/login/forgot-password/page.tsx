"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import randomstring from "randomstring";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z
  .object({
    email: z.string(),
    code: z
      .string()
      .min(6, { message: "Code must be 6 characters long" })
      .max(6, { message: "Code must be 6 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const page = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [isExpired, setIsExpired] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (timer === 0) {
      setIsExpired(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async () => {
    setIsSending(true);
    let new_code = randomstring.generate(6);
    setCode(new_code);
    try {
      const response = await axios.post("/api/reset", {
        email: form.getValues("email"),
        code: new_code,
      });
      toast.success(response.data.message);
      setTimer(30);
      setIsExpired(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSending(false);
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    if (isExpired) {
      toast.error("Invalid code");
      setIsSubmitting(false);
      return;
    }
    if (values.code !== code) {
      toast.error("Invalid code");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.put("/api/reset", {
        email: values.email.toLowerCase(),
        password: values.password,
      });
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen px-8 md:px-16">
      <h1 className="text-3xl font-semibold mb-3">
        Reset your{" "}
        <span className="bg-primary text-white px-2 italic">Password!</span>{" "}
      </h1>{" "}
      <p className="text-center text-sm text-gray-400 mb-5">
        Please enter the code that will be sent to your email and your new
        password.
      </p>
      <div className="w-full max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-end w-full gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={sendEmail}
                disabled={
                  timer !== 0 || form.getValues("email") === "" || isSending
                }
                className="flex justify-center border p-2 border-black bg-transparent text-white  dark:border-white relative group transition duration-200"
              >
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative text-sm font-semibold whitespace-nowrap">
                  {isSending
                    ? "Sending..."
                    : isExpired
                    ? "Send Code"
                    : "00:" + (timer > 9 ? timer : "0" + timer)}
                </span>
              </button>
            </div>
            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel className="text-center block">Code </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="font-bold text-xl tracking-[9px] text-center"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Go back to login?
            </Link>
            <Button
              type="submit"
              className="rounded-none font-bold w-full bg-transparent hover:bg-transparent py-3 border border-black dark:border-white relative group transition duration-200"
            >
              <div className="absolute bottom-0 right-0 bg-primary h-full w-full -z-10 group-hover:scale-x-95 group-hover:scale-y-75 transition-all duration-200" />
              <span className="relative text-white">
                {isSubmitting ? "Submitting..." : "Change Password"}
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
