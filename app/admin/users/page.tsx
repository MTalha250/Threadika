"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
const page = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const fetchTotalUsers = async () => {
    const response = await axios.get("/api/register");
    setUsers(response.data.result);
  };

  const handleRoleChange = async (id: any, role: any) => {
    try {
      const response = await axios.put(`/api/update/${id}`, { role });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="py-10 px-4 md:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-700 tracking-wider mb-10 text-center">
        All Users
      </h1>
      <div>
        <input
          type="text"
          className="w-full border-b bg-transparent focus:outline-none"
          placeholder="Search users by name, email, phone, address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table className="mt-5 text-[15px]">
        <TableCaption>
          A list of all users registered on the platform
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">Phone</TableHead>
            <TableHead className="text-center text-white">Address</TableHead>
            <TableHead className="text-center text-white">Role</TableHead>
            <TableHead className="text-center text-white">Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter(
              (user: any) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.phone.toLowerCase().includes(search.toLowerCase()) ||
                user.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.phone}</TableCell>
                <TableCell className="text-center">{user.address}</TableCell>
                <TableCell className="text-center">
                  <Select
                    onValueChange={(value: any) => {
                      handleRoleChange(user._id, value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          user.role[0].toUpperCase() + user.role.slice(1)
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center flex justify-center">
                  {user.isVerified ? (
                    <IoCheckmarkDoneCircle className="text-3xl text-green-600" />
                  ) : (
                    <IoMdCloseCircle className="text-3xl text-red-600" />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
