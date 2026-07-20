export interface Contest {
  _id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: "UPCOMING" | "RUNNING" | "ENDED";
  participantCount: number;
  problems?: { _id: string; title: string; difficulty: string; tags: string[] }[];
  participants?: string[];
  createdBy?: { _id: string; username: string; fullName?: string };
  isPublic: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: { _id: string; username: string };
  solved: number;
  penalty: number;
  results: {
    problemId: string;
    code: string;
    title: string;
    slug: string;
    status: "AC" | "UNSOLVED";
    wrongAttempts: number;
    solveTime: number | null;
  }[];
}
