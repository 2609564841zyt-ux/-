import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YanTing — Portfolio",
  description: "YanTing 的沉浸式个人设计作品集，展示 UI/UX 与品牌设计案例。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
