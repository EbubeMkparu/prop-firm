"use client";
import CheckBox from "@/components/form/check-box";
import { FormField } from "@/components/form/form-field";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/../public/logo.png";

const Sigup = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    country: "",
    email: "",
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-5">
      <div className="w-[95%] md:w-[400px] mx-auto">
        <div className="py-6 lg:py-10">
          <Image
            src={logo}
            className="w-[150px] md:w-[160px] mx-auto my-3 lg:my-5"
            alt="Pipzen"
          />
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-foreground">
            Create your account
          </h3>
        </div>
        <form className="space-y-2">
          <div className="flex items-center gap-2">
            <FormField
              label="First Name"
              name="firstname"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              autoComplete="First Name"
            />
            <FormField
              label="Last Name"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              autoComplete="Last Name"
            />
          </div>

          <div className="flex items-center gap-2">
            <FormField
              label="Email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="Email"
            />
            <FormField
              label="User Name"
              name="username"
              placeholder="User Name"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="User Name"
            />
          </div>

          <FormField
            label="Phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            autoComplete="Phone"
          />

          <FormField
            label="Country"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            autoComplete="Country"
          />

          <FormField
            label="New Password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleInputChange}
            autoComplete="New Password"
          />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            autoComplete="Confirm Password"
          />

          <div className="mt-2 flex items-center justify-between">
            <CheckBox
              id="terms"
              label="I declare that I have read and agree with Terms & Conditions"
            />
          </div>

          <button
            type="submit"
            className="z-10 px-5 py-3 font-semibold bg-[#FFD700] hover:bg-[#ffd900c9] hover:transition-colors cursor-pointer rounded-full ease-in-out select-none animate-[0.3s_ease_0s_1_normal_none_running_none] border-black border-opacity-0 duration-[0.3s] shadow-[rgb(255,255,255)_0px_0px_0px_0px,rgba(59,130,246,0.5)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px] text-neutral-800 w-full mt-4 md:mt-5 lg:mt-7"
          >
            Register
          </button>
        </form>
        <div className="py-5 lg:py-8">
          <span className="block text-center font-semibold rounded-full uppercase w-max mx-auto text-black p-1 bg-[#FFD700] text-sm font">
            OR
          </span>
          <p className="mt-3 text-center text-xs text-[#FFD700]">
            Already have an account?
            <Link href="/signin" className=" font-semibold underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sigup;
