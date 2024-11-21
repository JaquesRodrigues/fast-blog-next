import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Fast Blog",
  description: "Projeto de um blog feito com Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        <nav className="text-white p-4">
          <ul className="flex gap-4 justify-around">
            <li>
              <Link
                className="font-bold hover:underline hover:text-slate-700"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="font-bold hover:underline hover:text-slate-700"
                href="/posts"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                className="font-bold hover:underline hover:text-slate-700"
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
