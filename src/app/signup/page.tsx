"use client";

import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSignup = async (userData: {
    email: string;
    password: string;
  }) => {
    await signup(userData);
    router.push("/");
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <AuthForm type="signup" onSubmit={handleSignup} />;
}
