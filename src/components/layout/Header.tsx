'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase"; // ← 追加

export default function Header() {
  const { t, toggleLanguage } = useLanguage();
  const { user, loginWithGoogle } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center overflow-x-hidden flex-wrap md:flex-nowrap">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-base sm:text-lg truncate max-w-[150px] sm:max-w-none">
              {t("appName")}
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-blue-600">
              {t("heroTitle")}
            </Link>
            <Link href="/estimate" className="text-sm font-medium transition-colors hover:text-blue-600">
              {t("estimateTitle")}
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-blue-600">
              {t("dashboard")}
            </Link>
          </nav>

          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="text-sm font-medium"
          >
            {t("languageToggle")}
          </Button>

          {user ? (
            <Button variant="outline" onClick={handleLogout}>
              {t("logout") || "ログアウト"}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border border-gray-300 flex items-center gap-2 px-4 py-2 text-sm"
              onClick={loginWithGoogle}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-4 w-4"
              />
              Googleでログイン
            </Button>
          )}

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("heroTitle")}
                </Link>
                <Link
                  href="/estimate"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("estimateTitle")}
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("dashboard")}
                </Link>

                {user ? (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    {t("logout") || "ログアウト"}
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsOpen(false);
                      loginWithGoogle();
                    }}
                    className="flex items-center gap-2"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="h-4 w-4"
                    />
                    Googleでログイン
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
