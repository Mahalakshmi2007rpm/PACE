"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";

const utilizationData = [
  { label: "Mon", utilization: 62, revenue: 16000 },
  { label: "Tue", utilization: 67, revenue: 18400 },
  { label: "Wed", utilization: 73, revenue: 22200 },
  { label: "Thu", utilization: 77, revenue: 23800 },
  { label: "Fri", utilization: 82, revenue: 26600 },
  { label: "Sat", utilization: 85, revenue: 28100 }
];

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <h3 className="text-lg font-semibold text-white">Fleet utilization</h3>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0b1f33", border: "1px solid rgba(255,255,255,0.1)" }} />
              <Line type="monotone" dataKey="utilization" stroke="#15b7a8" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-semibold text-white">Revenue trend</h3>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0b1f33", border: "1px solid rgba(255,255,255,0.1)" }} />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
