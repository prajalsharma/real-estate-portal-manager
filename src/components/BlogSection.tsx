"use client"

import * as React from "react"
import Link from "next/link"
import { Newspaper } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string // ISO string or readable date
  category?: string
  href?: string
}

export interface BlogSectionProps {
  className?: string
  title?: string
  description?: string
  posts?: BlogPost[]
  onReadMore?: (post: BlogPost) => void
}

const defaultPosts: BlogPost[] = [
  {
    id: "mortgage-loans-basics",
    title: "Understanding Mortgage Loans in Greece: Rates, Terms, and Tips",
    excerpt:
      "Navigate the Greek mortgage landscape with confidence. Learn how fixed vs. variable rates work, what banks look for, and how to prepare your documentation to secure favorable terms.",
    date: "2025-04-20",
    category: "Mortgage & Finance",
    href: "/blog/mortgage-loans-basics",
  },
  {
    id: "interior-decoration-trends",
    title: "Minimal Interior Decoration Ideas for Small Athens Apartments",
    excerpt:
      "Maximize light, space, and comfort with minimalist design principles. Discover color palettes, modular furniture, and smart storage that elevate compact urban living.",
    date: "2025-03-28",
    category: "Interior Decoration",
    href: "/blog/interior-decoration-trends",
  },
  {
    id: "market-trends-2025",
    title: "Greek Real Estate Market Trends 2025: What Buyers Should Know",
    excerpt:
      "From short-term rentals to suburban growth, we analyze the latest pricing data and buyer behavior across major Greek cities to help you time your purchase wisely.",
    date: "2025-05-10",
    category: "Market Insights",
    href: "/blog/market-trends-2025",
  },
  {
    id: "first-time-buyer-guide",
    title: "First-Time Home Buyer Guide: From Viewing to Closing",
    excerpt:
      "A step-by-step checklist covering property viewings, legal due diligence, negotiation strategies, and closing costs—crafted for first-time buyers in Greece.",
    date: "2025-02-12",
    category: "Buying Guides",
    href: "/blog/first-time-buyer-guide",
  },
]

export default function BlogSection({
  className,
  title = "Real Estate Blog",
  description = "Fresh insights on mortgages, interiors, market movements, and buying smarter.",
  posts = defaultPosts,
  onReadMore,
}: BlogSectionProps) {
  const formatter = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    } catch {
      return null
    }
  }, [])

  const handleReadMore = React.useCallback(
    (post: BlogPost) => {
      if (onReadMore) {
        onReadMore(post)
        return
      }
      if (post.href) {
        // Let the link handle navigation when href is present
        return
      }
      toast("Opening article", {
        description: "This article will be available soon.",
      })
    },
    [onReadMore]
  )

  return (
    <section
      aria-labelledby="blog-heading"
      className={cn("w-full max-w-full", className)}
    >
      <header className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-foreground">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card"
          >
            <Newspaper className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2
            id="blog-heading"
            className="font-heading text-lg sm:text-xl md:text-2xl"
          >
            {title}
          </h2>
        </div>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground max-w-prose">
            {description}
          </p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const dateLabel =
            formatter && !Number.isNaN(Date.parse(post.date))
              ? formatter.format(new Date(post.date))
              : post.date

          const Content = (
            <Card
              asChild
              className="group h-full rounded-[var(--radius)] border border-border bg-card transition-shadow duration-200 hover:shadow-sm"
            >
              <article className="flex h-full flex-col">
                <CardHeader className="space-y-2 pb-3">
                  <div className="flex items-center gap-2">
                    <time
                      dateTime={new Date(post.date).toISOString()}
                      className="text-xs text-muted-foreground"
                    >
                      {dateLabel}
                    </time>
                    {post.category ? (
                      <Badge
                        variant="secondary"
                        className="rounded-md px-2 py-0.5 text-[11px]"
                      >
                        {post.category}
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle className="min-w-0 text-base sm:text-lg font-heading">
                    <span className="block min-w-0 truncate" title={post.title}>
                      {post.title}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-0">
                  <p className="text-sm text-foreground/80 break-words">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="mt-auto pt-4">
                  {post.href ? (
                    <Button
                      asChild
                      variant="ghost"
                      className="px-0 text-destructive hover:text-destructive"
                    >
                      <Link
                        href={post.href}
                        aria-label={`Read more: ${post.title}`}
                        onClick={() => handleReadMore(post)}
                      >
                        Read more
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      className="px-0 text-destructive hover:text-destructive"
                      aria-label={`Read more: ${post.title}`}
                      onClick={() => handleReadMore(post)}
                    >
                      Read more
                    </Button>
                  )}
                </CardFooter>
              </article>
            </Card>
          )

          return (
            <div key={post.id} className="min-w-0">
              {Content}
            </div>
          )
        })}
      </div>
    </section>
  )
}