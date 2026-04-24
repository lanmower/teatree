export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6">{children}</div>
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col">{children}</div>
}
