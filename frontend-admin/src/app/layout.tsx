/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Layout principal admin — Sidebar Premium Dark avec Auth Guard
 * @created 2026-05-22
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Alixco-luce Admin",
  description: "Console d'administration Alixco-luce | Nexus Partners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <body className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--text-main))]">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#171717',
                color: '#e5e5e5',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#F26E11',
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          <div className="flex min-h-screen">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <main className="flex-grow p-6 lg:p-8">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
