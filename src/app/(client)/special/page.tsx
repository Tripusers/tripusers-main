"use client";

import Loader from "@/components/default/loader/Loader";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const page = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/#specialPackages");
  }, []);
  return <Loader />;
};

export default page;
