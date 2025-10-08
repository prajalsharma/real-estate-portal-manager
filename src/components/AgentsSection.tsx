"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Star, Phone, IdCard, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Agent = {
  id: string;
  name: string;
  role?: string;
  rating: number; // 0 - 5
  sold: number;
  phone?: string;
  imageUrl: string;
};

type AgentsSectionProps = {
  className?: string;
  title?: string;
  ctaLabel?: string;
  onAgentContact?: (agent: Agent) => void;
  onViewProfile?: (agent: Agent) => void;
  agents?: Agent[];
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function StarRating({ value }: { value: number }) {
  const rounded = Math.round(value * 2) / 2;
  const full = Math.floor(rounded);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-1 text-[#eab308]">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-[#eab308]" aria-hidden="true" />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4" aria-hidden="true" />
      ))}
      <span className="ml-1 text-xs font-medium text-foreground/70">{value.toFixed(1)}</span>
    </div>
  );
}

function AgentCard({
  agent,
  onContact,
  onViewProfile,
}: {
  agent: Agent;
  onContact?: (agent: Agent) => void;
  onViewProfile?: (agent: Agent) => void;
}) {
  const initials = React.useMemo(() => {
    const parts = agent.name.split(" ");
    return parts.slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  }, [agent.name]);

  const handleContact = () => {
    onContact?.(agent);
    toast.success(`We'll connect you with ${agent.name}`, {
      description: agent.phone ? `Calling ${agent.phone}...` : "Expect a call back shortly.",
    });
  };

  const handleViewProfile = () => {
    onViewProfile?.(agent);
    toast.message(`Opening ${agent.name}'s profile`);
  };

  return (
    <Card className="group relative w-[280px] shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 ring-1 ring-border">
            <AvatarImage src={agent.imageUrl} alt={`${agent.name} headshot`} />
            <AvatarFallback className="bg-muted text-foreground/70">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold text-foreground">{agent.name}</p>
            <p className="truncate text-xs text-muted-foreground">{agent.role ?? "Real Estate Agent"}</p>
            <div className="mt-1">
              <StarRating value={agent.rating} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{agent.sold.toLocaleString()}</span> sold
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-lg border bg-white hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Contact ${agent.name}`}
              onClick={handleContact}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="default"
              className="h-9 w-9 rounded-lg bg-foreground text-white hover:bg-foreground/90 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View ${agent.name}'s profile`}
              onClick={handleViewProfile}
            >
              <IdCard className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const defaultAgents: Agent[] = [
  {
    id: "1",
    name: "Eleni Papadopoulou",
    role: "Senior Listing Agent • Athens",
    rating: 5.0,
    sold: 132,
    phone: "+30 210 123 4567",
    imageUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Nikos Georgiou",
    role: "Buyer Specialist • Thessaloniki",
    rating: 5.0,
    sold: 98,
    phone: "+30 231 012 3456",
    imageUrl:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Maria Konstantinou",
    role: "Luxury Homes • Mykonos",
    rating: 5.0,
    sold: 76,
    phone: "+30 2289 012 345",
    imageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Giorgos Dimitriou",
    role: "Commercial • Piraeus",
    rating: 5.0,
    sold: 143,
    phone: "+30 210 765 4321",
    imageUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AgentsSection({
  className,
  title = "Skip the hustle and let the pros get things done",
  ctaLabel = "Top Agents",
  agents = defaultAgents,
  onAgentContact,
  onViewProfile,
}: AgentsSectionProps) {
  return (
    <section className={cx("w-full bg-background", className)}>
      <div className="w-full max-w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-xl leading-snug text-foreground sm:text-2xl md:text-3xl">
              Sell with top agents
            </h2>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground sm:text-base">
              {title}
            </p>
          </div>
          <div className="shrink-0">
            <Button
              asChild
              variant="outline"
              className="rounded-lg border border-input bg-white text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Browse top agents"
            >
              <Link href="/agents" prefetch>
                <PanelRight className="mr-2 h-4 w-4" />
                {ctaLabel}
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none]">
            {/* Hide scrollbar in WebKit */}
            <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
            <div className="scrollbar-hide -m-1 flex min-w-0 gap-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onContact={onAgentContact}
                  onViewProfile={onViewProfile}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}