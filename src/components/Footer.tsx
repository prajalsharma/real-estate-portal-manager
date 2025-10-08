"use client";

import Link from "next/link";
import { Facebook, ContactRound, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface FooterProps {
  className?: string;
}

const linkBase =
  "text-sm text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background] transition-colors";
const mutedText = "text-sm text-[--muted-foreground]";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-heading text-base sm:text-lg text-foreground mb-3 sm:mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5 sm:space-y-3">{children}</ul>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label="Home" className="group inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center"
      >
        <svg
          viewBox="0 0 64 64"
          className="h-full w-full"
          role="img"
          aria-label="Brand logo"
        >
          <defs>
            <linearGradient id="r" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-red)" />
              <stop offset="100%" stopColor="#e01c0f" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="60" height="60" rx="10" fill="url(#r)" />
          <path
            d="M18 40V26l14-10 14 10v14"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 42h16v8H24z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </span>
      <div className="flex flex-col">
        <span className="font-heading text-base sm:text-lg text-foreground leading-none">
          RealEstate
        </span>
        <span className="text-xs text-[--muted-foreground] leading-none mt-1">
          Athens • Greece
        </span>
      </div>
    </Link>
  );
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full bg-white text-foreground", className)}>
      <div className="container w-full max-w-7xl py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <Logo />
              <p className={cn(mutedText, "mt-4 max-w-prose break-words")}>
                Trusted real estate partner in Greece. Discover condos, houses, and
                commercial properties to buy or rent, with expert guidance at every step.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[--muted-foreground]">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs sm:text-sm">
                  Licensed • Since 2012
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 w-full">
              <Column title="Menu">
                <li className="min-w-0">
                  <Link href="/about" className={linkBase}>
                    About
                  </Link>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Condos
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Houses
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Commercial
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    For rent
                  </span>
                </li>
              </Column>

              <Column title="Info">
                <li className="min-w-0">
                  <Link href="/blog" className={linkBase}>
                    Blog
                  </Link>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Buyers Guide
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Sellers Guide
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Price Calculator
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Mortgage Calculator
                  </span>
                </li>
              </Column>

              <Column title="Help">
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Support
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Real estate valuation
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Legal support
                  </span>
                </li>
                <li className="min-w-0">
                  <span className={linkBase} role="link" tabIndex={0}>
                    Rent and sale
                  </span>
                </li>
              </Column>

              <Column title="Contacts">
                <li className="flex items-start gap-2">
                  <ContactRound className="mt-0.5 h-4 w-4 text-[--color-red]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">+30 21 0000 0000</p>
                    <p className={mutedText}>Mon–Fri, 9:00–18:00 EET</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ContactRound className="mt-0.5 h-4 w-4 text-[--color-red]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground break-words">
                      hello@realestate.gr
                    </p>
                    <p className={mutedText}>Email us anytime</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ContactRound className="mt-0.5 h-4 w-4 text-[--color-red]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">
                      12 Ermou St, Athens 105 63
                    </p>
                    <p className={mutedText}>Greece</p>
                  </div>
                </li>
                <li className="mt-1">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our Facebook"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[--border] text-foreground/80 hover:text-foreground hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background] transition-colors"
                    >
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </li>
              </Column>
            </div>
          </div>

          <div className="h-px w-full bg-[--border]" aria-hidden="true" />

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[--muted-foreground]">
              © {new Date().getFullYear()} RealEstate. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/about" className="text-xs text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background]">
                About
              </Link>
              <Link href="/contact" className="text-xs text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background]">
                Contact
              </Link>
              <span className="text-xs text-[--muted-foreground]">Privacy</span>
              <span className="text-xs text-[--muted-foreground]">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}