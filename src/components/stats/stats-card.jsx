"use client";

import { useAIChatStats } from "@/components/ai/ask-ai-widget";
import { useGitHubStats } from "@/components/custom/github-calendar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUpIcon,
  GitBranchIcon,
  StarIcon,
  UsersIcon,
  FileTextIcon,
  ZapIcon,
} from "lucide-react";

export const StatsCard = () => {
  const { totalChats, totalCached } = useAIChatStats();
  const { mostProductiveDay, mostProductiveHour, mostUsedLanguage, loading } =
    useGitHubStats();

  const weeklyProductivity = [
    { day: "Mon", commits: 12, hours: 6.5 },
    { day: "Tue", commits: 8, hours: 4.2 },
    { day: "Wed", commits: 15, hours: 7.8 },
    { day: "Thu", commits: 10, hours: 5.5 },
    { day: "Fri", commits: 18, hours: 8.2 },
    { day: "Sat", commits: 5, hours: 2.1 },
    { day: "Sun", commits: 3, hours: 1.5 },
  ];

  const hourlyActivity = [
    { hour: "6AM", activity: 2 },
    { hour: "8AM", activity: 15 },
    { hour: "10AM", activity: 25 },
    { hour: "12PM", activity: 30 },
    { hour: "2PM", activity: 35 },
    { hour: "4PM", activity: 28 },
    { hour: "6PM", activity: 20 },
    { hour: "8PM", activity: 12 },
    { hour: "10PM", activity: 8 },
  ];

  const languageDistribution = [
    { name: "TypeScript", value: 35, color: "#3178c6" },
    { name: "JavaScript", value: 25, color: "#f7df1e" },
    { name: "Python", value: 20, color: "#3776ab" },
    { name: "React", value: 15, color: "#61dafb" },
    { name: "Other", value: 5, color: "#8884d8" },
  ];

  const aiUsageTrend = [
    { month: "Jan", chats: 45, cached: 12 },
    { month: "Feb", chats: 52, cached: 18 },
    { month: "Mar", chats: 68, cached: 25 },
    { month: "Apr", chats: 75, cached: 32 },
    { month: "May", chats: 89, cached: 41 },
    { month: "Jun", chats: 95, cached: 48 },
  ];

  const additionalStats = [
    {
      title: "GitHub Stars",
      value: "1.2K",
      icon: StarIcon,
      description: "Total repository stars",
      color: "bg-yellow-500",
      trend: "+12%",
    },
    {
      title: "Pull Requests",
      value: "156",
      icon: GitBranchIcon,
      description: "Merged this year",
      color: "bg-purple-500",
      trend: "+8%",
    },
    {
      title: "Code Reviews",
      value: "89",
      icon: FileTextIcon,
      description: "Reviews completed",
      color: "bg-indigo-500",
      trend: "+15%",
    },
    {
      title: "Followers",
      value: "342",
      icon: UsersIcon,
      description: "GitHub followers",
      color: "bg-green-500",
      trend: "+23%",
    },
    {
      title: "Streak Days",
      value: "47",
      icon: ZapIcon,
      description: "Current commit streak",
      color: "bg-red-500",
      trend: "Active",
    },
    {
      title: "Productivity Score",
      value: "94",
      icon: TrendingUpIcon,
      description: "Overall performance",
      color: "bg-blue-500",
      trend: "+5%",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-32 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="ai-usage">AI Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {stat.trend}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Commit Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="commits"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Coding Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hourly Activity Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={languageDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {languageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Usage Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={languageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Usage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={aiUsageTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="chats"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="cached"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {totalCached && totalChats
                      ? Math.round((totalCached / totalChats) * 100)
                      : 0}
                    %
                  </div>
                  <p className="text-muted-foreground">Cache Hit Rate</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {totalCached} cached out of {totalChats} total chats
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
