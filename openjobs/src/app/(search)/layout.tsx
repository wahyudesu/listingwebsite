import Header from "@/components/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-svh grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
      <Header />
      {children}
    </div>
  );
}
