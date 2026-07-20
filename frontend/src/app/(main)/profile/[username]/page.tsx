"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Mail, Code2, Trophy, Target, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VerdictBadge } from "@/components/editor/VerdictBadge";
import { PageSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { profileService } from "@/services/profile.service";
import type { ProfileData } from "@/types/user.types";

const DIFFICULTY_COLORS = {
  Easy: { bar: "bg-emerald-400", text: "text-emerald-400" },
  Medium: { bar: "bg-amber-400", text: "text-amber-400" },
  Hard: { bar: "bg-red-400", text: "text-red-400" },
};

const LANG_COLORS: Record<string, string> = {
  cpp: "bg-blue-400",
  c: "bg-gray-400",
  java: "bg-orange-400",
  python: "bg-yellow-400",
};

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getPublicProfile(username);
        setProfile(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Profile not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (isLoading) return <div className="p-6"><PageSkeleton /></div>;
  if (error || !profile) return <div className="p-6"><ErrorState description={error || "Profile not found"} /></div>;

  const { user, stats, languageStats, recentSubmissions } = profile;
  const maxLangCount = Math.max(...languageStats.map((l) => l.count), 1);

  const statCards = [
    { label: "Total Submissions", value: stats.totalSubmissions, icon: Code2, bg: "bg-violet-500/10", color: "text-violet-400" },
    { label: "Solved Problems", value: stats.solvedProblems, icon: Trophy, bg: "bg-emerald-500/10", color: "text-emerald-400" },
    { label: "Accepted", value: stats.acceptedSubmissions, icon: Target, bg: "bg-blue-500/10", color: "text-blue-400" },
    { label: "Accuracy", value: `${stats.accuracy.toFixed(1)}%`, icon: Percent, bg: "bg-amber-500/10", color: "text-amber-400" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-border/50 glass">
          <CardContent className="p-6">
            <div className="flex items-start gap-5">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 text-2xl font-bold text-primary">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> {user.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Badge variant="outline" className="mt-1 text-xs border-violet-500/20 text-violet-400 bg-violet-500/10">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Card className="border-border/50 glass">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Breakdown */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-border/50 glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Difficulty Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(["Easy", "Medium", "Hard"] as const).map((diff) => {
                const count = stats.solvedByDifficulty[diff] || 0;
                const total = diff === "Easy" ? 100 : diff === "Medium" ? 100 : 100;
                const pct = Math.min((count / total) * 100, 100);
                const colors = DIFFICULTY_COLORS[diff];
                return (
                  <div key={diff} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${colors.text}`}>{diff}</span>
                      <span className="text-muted-foreground">{count}/{total}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`h-full rounded-full ${colors.bar}`}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Language Stats */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="border-border/50 glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Languages Used</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {languageStats.length === 0 ? (
                <p className="text-xs text-muted-foreground">No submissions yet.</p>
              ) : (
                languageStats.map((lang) => {
                  const pct = (lang.count / maxLangCount) * 100;
                  return (
                    <div key={lang.language} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium capitalize">{lang.language}</span>
                        <span className="text-muted-foreground">{lang.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.45 }}
                          className={`h-full rounded-full ${LANG_COLORS[lang.language] || "bg-primary"}`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Submissions */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-border/50 glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No submissions yet.</p>
            ) : (
              <div className="space-y-2">
                {recentSubmissions.map((sub) => (
                  <div key={sub._id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <VerdictBadge verdict={sub.verdict} size="sm" showIcon={false} />
                      <span className="text-sm">
                        {typeof sub.problemId === "object" ? sub.problemId.title : "Unknown Problem"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px] uppercase border-border/50">{sub.language}</Badge>
                      {sub.executionTime > 0 && <span>{sub.executionTime}ms</span>}
                      <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
