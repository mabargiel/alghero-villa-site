"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Strona główna" },
  { href: "/gallery", label: "Galeria" },
  { href: "/contact", label: "Kontakt" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="absolute left-0 top-0 z-20 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <div className="text-sm uppercase tracking-[0.35em] text-white/80">
          Villa Monte Calvia
        </div>
        <nav className="flex items-center gap-8 text-[15px] font-semibold uppercase tracking-[0.18em] text-white/90">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative transition ${
                isActive ? "text-white" : "hover:text-white"
              }`}
            >
              {item.label}
              <span
                  className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full bg-white/90 transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          );
        })}
        </nav>
      </div>
    </header>
  );
}
