"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

// This component contains the logic that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const message =
    searchParams.get("message") || "Operation completed successfully!";
  const router = useRouter();

  return (
    <DashboardLayout userRole="provider">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white">
        <Card className="w-full max-w-lg border-0 shadow-xl rounded-2xl bg-white animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-3xl font-bold text-slate-800">
              <CheckCircle className="h-8 w-8 text-emerald-500 animate-pulse" />
              Success
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg font-medium text-slate-600">
              {decodeURIComponent(message)}
            </p>
            <Button
              variant="default"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              onClick={() => router.push("/provider/notifications")}
            >
              Back to Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Main component that wraps the content in Suspense
export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white">
          <Card className="w-full max-w-lg border-0 shadow-xl rounded-2xl bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-slate-800">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
