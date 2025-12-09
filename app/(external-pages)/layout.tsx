import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/app/providers";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-black">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default layout;