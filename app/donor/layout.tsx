import FullMenu from "@/components/donor/navigation/navbar/Full-Menu";
import Footer from "@/components/navigation/Footer";

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <FullMenu />
      {children}
      <Footer />
    </div>
  );
}
