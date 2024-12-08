import { Navbar } from "@/components/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="fixed inset-0 h-[80px] w-full">
        <Navbar />
      </div>
      <div className="h-screen px-6 pt-[80px] md:px-[120px]">{children}</div>
    </div>
  );
}
