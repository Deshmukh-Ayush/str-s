import Link from "next/link";
import { Container } from "./container";
import { GithubIcon } from "./brand-icons";
import { StrLogo } from "@/components/str-logo";

const links = [
  { href: "/#playground", label: "Playground" },
  { href: "/#benchmarks", label: "Benchmarks" },
  { href: "/#surfaces", label: "Surfaces" },
  { href: "/docs", label: "Docs" },
];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-fd-background/80 backdrop-blur-md">
      <Container className="grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="flex items-center gap-2.5 justify-self-start rounded-md font-semibold tracking-tight text-fd-foreground transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fd-ring"
        >
          <StrLogo size={24} priority />
          <span className="text-sm">str-s</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm text-fd-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm transition-colors hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fd-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href="https://github.com/Deshmukh-Ayush/str-s"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="inline-flex size-9 items-center justify-center rounded-full text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
          >
            <GithubIcon className="size-4 fill-current" aria-hidden="true" />
          </a>
          <Link
            href="/docs"
            className="inline-flex h-9 items-center rounded-full bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
          >
            Get started
          </Link>
        </div>
      </Container>
    </header>
  );
}
