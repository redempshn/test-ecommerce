export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col overflow-hidden">
      {children}
    </main>
  );
}
