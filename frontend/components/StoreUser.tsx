"use client";
import useUser from "@/store/useUser";
import { useEffect } from "react";

const StoreUser = ({ userid }: { userid: number | null }) => {
  const { setUser} = useUser();
  

  useEffect(() => {
    if (userid) {
      console.log("User ID from server:", userid); // ✅ log here
      setUser(userid);
    }
  }, [userid, setUser]);

  return null;
};

export default StoreUser;
