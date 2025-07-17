import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DetailCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Detail Page</CardTitle>
        <div className="flex space-x-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Design</span>
          <span className="text-xs text-muted-foreground">...</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-32 bg-gray-800 flex items-center justify-center rounded-md">
          <span className="text-gray-400">📷</span>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div className="flex space-x-2">
            <span>💾 6</span>
            <span>💬 28</span>
          </div>
          <div className="flex space-x-2">
            <span>👤👤👤 +2</span>
            <span>⚡ Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}