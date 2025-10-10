"use client";

import Link from "next/link";
import { Facebook, ContactRound, Building2, Mail, House } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface FooterProps {
  className?: string;
}

const linkBase =
  "text-sm text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background] transition-colors";
const mutedText = "text-sm text-[--muted-foreground]";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="font-heading text-base sm:text-lg text-foreground mb-3 sm:mb-4 font-medium">
        {title}
      </h3>
      <div className="space-y-2.5 sm:space-y-3 flex md:flex-col">{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label="Home" className="group inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="relative inline-flex size-15 md:size-20 items-center justify-center">
        <img
          src="/logo.svg"
          alt="Spasic Real Estate logo"
          className="size-15 md:size-20 object-cover shrink-0"
        />
      </span>
      <div className="flex flex-col">
        <span className="font-heading text-foreground leading-none font-bold text-xl">
          Spasić Real Estate
        </span>
        <span className="text-xs text-[--muted-foreground] leading-none mt-1">Athens • Greece</span>
      </div>
    </Link>
  );
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full bg-white text-foreground", className)}>
      <div className="container w-full max-w-7xl py-6 sm:py-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-x-10 sm:justify-between">
            <div className="w-full flex-shrink-0 sm:max-w-70">
              <Logo />
              <p className={cn(mutedText, "mt-2.5 max-w-prose break-words")}>
                Trusted real estate partner in Greece. Discover condos, houses, and commercial
                properties to buy or rent, with expert guidance at every step.
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-[--muted-foreground]">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs sm:text-sm">Licensed • Since 2012</span>
              </div>
            </div>

            <div className="flex-1 pt-1 sm:pt-3 md:pt-5">
              <div className="flex flex-col md:flex-row gap-5 sm:gap-7 justify-around">
                <Column title="Menu">
                  <ul className="flex gap-2 md:flex-col">
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
                  </ul>
                </Column>

                <Column title="Help">
                  <ul className="flex gap-x-4 md:flex-col flex-wrap md:gap-2">
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
                  </ul>
                </Column>

                <Column title="Contacts">
                  <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    <li className="flex items-start gap-2">
                      <ContactRound
                        className="mt-0.5 h-4 w-4 text-[--color-red]"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground">+30 21 0000 0000</p>
                        <p className={mutedText}>Mon–Fri, 9:00–18:00 EET</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4 text-[--color-red]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground break-words">hello@realestate.gr</p>
                        <p className={mutedText}>Email us anytime</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <House className="mt-0.5 h-4 w-4 text-[--color-red]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground">12 Ermou St, Athens 105 63</p>
                        <p className={mutedText}>Greece</p>
                      </div>
                    </li>
                  </ul>
                </Column>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-[--border]" aria-hidden="true" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row items-center sm:justify-between">
            <p className="text-xs text-[--muted-foreground]">
              © {new Date().getFullYear()} RealEstate. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="/about"
                className="text-xs text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background]">
                About
              </Link>
              <Link
                href="/contact"
                className="text-xs text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--background]">
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
