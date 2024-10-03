import FullMenu from "@/components/donor/navigation/navbar/Full-Menu";

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <FullMenu />
      {children}
    </div>
  );
}
