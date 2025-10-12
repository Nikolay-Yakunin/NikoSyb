import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { METADATA_URL } from "@/shared/model";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(METADATA_URL),
  title: "NIKOSYB",
  description:
    "Личный блог full-stack разрабочика Nikolay-Yakunin. Здесь вы найдете новости о моей жизни, мои достижения и открытия. Приятного чтения!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
