"use client";

import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    await login(credentials);
    router.push("/");
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
