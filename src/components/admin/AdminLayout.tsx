"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export function AdminLayout({ children, currentPath }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#F7F4EF]">
      {/* Fixed Independent Sidebar */}
      <Sidebar
        currentPath={currentPath}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Independent Scrollable Content Area */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0 scroll-smooth">
        {/* Sticky Header with Backdrop Blur */}
        <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1580px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
