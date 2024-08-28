import { Card } from "@/components/ui/card";

export function Skeleton() {
  return (
    <div className="grid grid-cols-4 container gap-6">
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
      <Card className="w-full h-[360px] bg-gray-100 max-w-[316px] shadow-none overflow-hidden rounded-lg border-none transition-all"></Card>
    </div>
  );
}
