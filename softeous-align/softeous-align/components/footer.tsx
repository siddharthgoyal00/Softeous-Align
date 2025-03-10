import Link from "next/link"
import { Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="font-semibold">HR Platform</span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HR Platform. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

