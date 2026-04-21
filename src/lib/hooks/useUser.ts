import { Member } from "../type/profile/userProfile";

export type UserRole =
  | "member"
  | "admin"
  | "chairman"
  | "gen_secretary"
  | "fin_secretary"
  | "secretary"
  | "treasurer"
  | "president";

export interface CookieUser {
  prefix: string;
  surname: string;
  other_names: string;
  email: string;
  role: UserRole;
  member_type: "old" | "new";
  status: "active" | "suspended" | "exited" | "pending";
  gender: "male" | "female";
  date_of_birth: string;
  marital_status: string;
  residential_address: string;
  permanent_address: string;
  phone_number: string;
  is_loan_eligible: boolean;
  months_as_member: number;
}

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useUser = () => {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = Cookies.get("user"); // Replace 'user' with your actual cookie name

    if (userData) {
      try {
        // js-cookie automatically handles %22 (") and %2C (,) decoding
        const parsedUser: Member = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    fullName: user ? `${user.prefix} ${user.surname} ${user.other_names}` : "",
    isCommittee: user ? user.role !== "member" : false,
  };
};
