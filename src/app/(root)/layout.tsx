import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full">
      <Image
        src="/background/bg.jpg"
        fill
        alt="background"
        style={{
          objectFit: "cover",
          zIndex: -20,
          objectPosition: "20% 60%",
        }}
      />
      <div className="absolute inset-0 -z-10 h-screen w-screen bg-gradient-to-t from-background to-background/50" />
      <div className="fixed inset-0 h-[80px] w-full">
        <Navbar />
      </div>
      <div className="h-screen px-[120px] pt-[80px]">{children}</div>
    </div>
  );
}
