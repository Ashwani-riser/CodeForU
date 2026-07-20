"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Calendar } from "lucide-react";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { contestService } from "@/services/contest.service";
import type { Contest } from "@/types/contest.types";

const statusConfig = {
  UPCOMING: { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Upcoming" },
  RUNNING: { color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Running", pulse: true },
  ENDED: { color: "bg-muted text-muted-foreground border-border", label: "Ended" },
};

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await contestService.getAll();
        setContests(res.data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const upcoming = contests.filter((c) => c.status === "UPCOMING");
  const running = contests.filter((c) => c.status === "RUNNING");
  const ended = contests.filter((c) => c.status === "ENDED");

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Contests</h1>
        <p className="text-muted-foreground">Compete in programming contests</p>
      </motion.div>

      {isLoading ? (
        <TableSkeleton rows={5} />
      ) : contests.length === 0 ? (
        <EmptyState title="No contests" description="Check back later for upcoming contests." />
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({contests.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="running">Running ({running.length})</TabsTrigger>
            <TabsTrigger value="ended">Ended ({ended.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <ContestGrid contests={contests} />
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <ContestGrid contests={upcoming} emptyText="No upcoming contests" />
          </TabsContent>
          <TabsContent value="running" className="mt-4">
            <ContestGrid contests={running} emptyText="No running contests" />
          </TabsContent>
          <TabsContent value="ended" className="mt-4">
            <ContestGrid contests={ended} emptyText="No ended contests" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function ContestGrid({ contests, emptyText = "No contests found" }: { contests: Contest[]; emptyText?: string }) {
  if (contests.length === 0) return <EmptyState title={emptyText} description="" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence>
        {contests.map((c, i) => {
          const status = statusConfig[c.status];
          return (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <Card className="border-border/50 bg-card/50 glass hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-base">{c.title}</h3>
                    <Badge variant="outline" className={`${status.color} text-xs shrink-0 ml-2`}>
                      {"pulse" in status && status.pulse && (
                        <span className="relative flex h-2 w-2 mr-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      )}
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(c.startTime).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(c.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {c.participantCount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
