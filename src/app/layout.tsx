import Footer from "@/components/site/footer"
import Navbar from "@/components/site/navbar"
import Providers from "@/components/ui/providers"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "./globals.css"

const urbanist = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Top 15",
  description: "Built with NextJS"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={urbanist.className}>
          <div className="flex min-h-dvh flex-col gap-10 selection:bg-primary/80 selection:text-primary-foreground">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}
