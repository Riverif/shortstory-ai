import Image from "next/image";
import { HomeClient } from "./_components/client";

export default function Home() {
  return (
    <main className="h-full w-full">
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
      <div className="absolute inset-0 -z-10 h-screen bg-gradient-to-t from-background to-background/50" />
      <HomeClient />
    </main>
  );
}
