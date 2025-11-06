// app/consumer/requests/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import router from "next/router";

interface ProviderResponse {
  notes: string;
  sentAt: string;
  accessToken: string;
  endpointUrl: string;
}

interface RequestData {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  lastUpdated?: string;
  services?: string[];
  providerResponse?: ProviderResponse;
}

export default function ConsumerRequestPage() {
  const params = useParams();
  const requestId = params.id; // [id] param
  const [request, setRequest] = useState<RequestData | null>(null);

  useEffect(() => {
    if (!requestId) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`, {
        withCredentials: true, // crucial
      })
      .then((res) => setRequest(res.data))
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.error("User not authenticated, redirecting to login...");
          router.push("/login");
        } else {
          console.error("Failed to fetch request:", err);
        }
      });
  }, [requestId]);

  if (!request)
    return <DashboardLayout userRole="consumer">Loading...</DashboardLayout>;

  return (
    <DashboardLayout userRole="consumer">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Request #{request.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Title:</strong> {request.title}
            </p>
            <p>
              <strong>Description:</strong> {request.description || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>

            {request.services && request.services.length > 0 ? (
              <div>
                <strong>Services:</strong>
                <ul>
                  {request.services.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>
                <strong>Services:</strong> None
              </p>
            )}

            {request.providerResponse && (
              <div className="mt-2">
                <strong>Provider Response:</strong>
                <p>Notes: {request.providerResponse.notes || "N/A"}</p>
                <p>
                  Endpoint:{" "}
                  {request.providerResponse.endpointUrl ? (
                    <a
                      href={request.providerResponse.endpointUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {request.providerResponse.endpointUrl}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p>Access Token: {request.providerResponse.accessToken}</p>
                <p>
                  Sent At:{" "}
                  {new Date(request.providerResponse.sentAt).toLocaleString()}
                </p>
              </div>
            )}

            <p>
              <strong>Created At:</strong>{" "}
              {new Date(request.createdAt).toLocaleString()}
            </p>
            {request.lastUpdated && (
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(request.lastUpdated).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
