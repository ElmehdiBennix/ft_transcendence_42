/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { InputOTPDemo } from "@/components/2fa/InputOTPDemo";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MyButton } from "@/components/generalUi/Button";
import { sendOtp } from "@/services/fetch-otp";
import { toast } from "@/hooks/use-toast";
const Login2fa = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const myString = "Go >";
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value) {
      const uname = window?.location ? localStorage?.getItem("username") : null;
      setUsername(uname);
    }
  }, [value]);

  const handleClick = async () => {
    try {
      const response = (await sendOtp(
        "validate-otp",
        value,
        username || null,
      )) as any;

      if (response.data.message) {
        toast({
          title: "success",
          description: response.data.message,
          className: "bg-primary border-none text-white",
          duration: 5000,
        });
        router.push("/home");
        return;
      } else if (response.data.error) {
        toast({
          title: "invalid code",
          description: response.data.error,
          className: "bg-primary-dark border-none text-white bg-opacity-20",
          duration: 8000,
        });
      }
    } catch {
      toast({
        title: "error",
        description: "Something went wrong",
        className: "bg-primary-dark border-none text-white bg-opacity-20",
        duration: 8000,
      });
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-center gap-10 transition-all">
      <div className="flex flex-col items-start justify-center transition-all">
        <h1 className="font-dayson text-3xl text-black opacity-80 transition-all duration-300 dark:text-white sm:text-5xl">
          2FA Code Required
        </h1>
      </div>
      <InputOTPDemo value={value} setValue={setValue} />
      <div className="flex items-end justify-end transition-all duration-300">
        <MyButton
          onClick={handleClick}
          className="h-[68px] w-[201px] rounded-lg font-poppins text-[24px] font-black transition-all duration-300 md:h-[88px] md:w-[301px] md:text-[36px]"
        >
          {myString}
        </MyButton>
      </div>
    </div>
  );
};

export default Login2fa;
