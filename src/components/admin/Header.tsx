"use client";

import React, { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuToggle?: () => void;
  title?: string;
  subtitle?: string;
}

export function Header({ onSearch, onMenuToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-[70px] sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-[#E5E0D8]/80 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Mobile Menu Toggle & Brand */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-[#1E242B] hover:bg-[#F7F4EF] border border-[#E5E0D8] shadow-2xs"
          aria-label="Ouvrir le menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-tr from-[#FD4F49] to-[#FF706B] shadow-2xs">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="8" cy="8" r="3" />
              <circle cx="16" cy="8" r="3" />
              <circle cx="8" cy="16" r="3" />
              <circle cx="16" cy="16" r="3" />
            </svg>
          </div>
          <span className="text-base font-black tracking-tight text-[#1E242B]">
            Ibigo
          </span>
        </div>
      </div>

      {/* Search Input with ⌘K Badge */}
      <div className="relative w-full max-w-md hidden lg:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Rechercher conteneur, convoi, chauffeur..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 pr-14 py-2 bg-[#F7F4EF]/60 border border-[#E5E0D8] rounded-xl text-xs text-[#1E242B] placeholder-[#94A3B8] focus:outline-none focus:border-[#FD4F49] focus:bg-white focus:ring-2 focus:ring-[#FD4F49]/10 transition-all"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-[#94A3B8] bg-white border border-[#E5E0D8] rounded-md shadow-2xs">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Actions & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">

        {/* Nouveau Fret Button with subtle gradient shadow */}
        <button
          type="button"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#FD4F49] to-[#F13D37] hover:from-[#E53E38] hover:to-[#D8322C] text-white text-xs font-bold shadow-[0_4px_14px_rgba(253,79,73,0.3)] transition-all active:scale-[0.98]"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="tracking-wide hidden xs:inline sm:inline">Nouveau Fret</span>
        </button>

        {/* Action Icons Group */}
        <div className="flex items-center gap-1 border-l border-[#E5E0D8] pl-2 sm:pl-3">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-[#666F7A] hover:bg-[#F7F4EF] hover:text-[#1E242B] transition-colors relative"
              aria-label="Notifications"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD4F49] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FD4F49]"></span>
              </span>
            </button>
          </div>
        </div>

        {/* User Profile Dropdown Pill */}
        <div className="relative pl-1">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 pr-2 rounded-xl hover:bg-[#F7F4EF] transition-colors border border-transparent hover:border-[#E5E0D8]"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#1E242B] text-white font-bold flex items-center justify-center text-xs overflow-hidden ring-2 ring-white shadow-2xs">
                <span>PK</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2E7D32] ring-2 ring-white" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-[#1E242B] leading-tight">
                  M. Paul Koyamba
                </p>
                <svg className="w-3 h-3 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <p className="text-[10px] text-[#666F7A] font-medium leading-tight">
                Chef Dispatcher • CEMAC
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
