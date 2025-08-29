import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MoodEntry {
  id: string;
  mood: number; // 1-5 scale
  note: string;
  date: Date;
  tags: string[];
}

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Very Low", color: "text-red-500" },
  { value: 2, emoji: "😔", label: "Low", color: "text-orange-500" },
  { value: 3, emoji: "😐", label: "Neutral", color: "text-yellow-500" },
  { value: 4, emoji: "😊", label: "Good", color: "text-green-500" },
  { value: 5, emoji: "😄", label: "Excellent", color: "text-emerald-500" },
];

const moodTags = [
  "anxious",
  "grateful",
  "stressed",
  "peaceful",
  "excited",
  "tired",
  "focused",
  "overwhelmed",
  "content",
  "motivated",
  "lonely",
  "connected",
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load mood data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mindmate-mood-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setMoodEntries(
        parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        })),
      );
    } else {
      // Add some sample data
      const sampleData: MoodEntry[] = [
        {
          id: "1",
          mood: 3,
          note: "Feeling okay today",
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          tags: ["neutral"],
        },
        {
          id: "2",
          mood: 4,
          note: "Had a good day at work",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          tags: ["motivated", "content"],
        },
        {
          id: "3",
          mood: 2,
          note: "Feeling a bit down",
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          tags: ["anxious", "tired"],
        },
        {
          id: "4",
          mood: 4,
          note: "Great workout session",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          tags: ["energetic", "accomplished"],
        },
        {
          id: "5",
          mood: 3,
          note: "Average day",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          tags: ["neutral"],
        },
        {
          id: "6",
          mood: 5,
          note: "Amazing day with friends!",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          tags: ["happy", "social", "grateful"],
        },
      ];
      setMoodEntries(sampleData);
    }
  }, []);

  // Save mood data to localStorage
  useEffect(() => {
    if (moodEntries.length > 0) {
      localStorage.setItem("mindmate-mood-data", JSON.stringify(moodEntries));
    }
  }, [moodEntries]);

  const handleSaveMood = () => {
    if (selectedMood === null) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note,
      date: new Date(),
      tags: selectedTags,
    };

    setMoodEntries((prev) => [newEntry, ...prev]);
    setSelectedMood(null);
    setNote("");
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Prepare chart data
  const chartData = moodEntries
    .slice(-7) // Last 7 entries
    .reverse()
    .map((entry) => ({
      date: entry.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      mood: entry.mood,
    }));

  const averageMood =
    moodEntries.length > 0
      ? (
          moodEntries.reduce((sum, entry) => sum + entry.mood, 0) /
          moodEntries.length
        ).toFixed(1)
      : "0";

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return "neutral";
    const recent = moodEntries.slice(0, 3);
    const older = moodEntries.slice(3, 6);
    const recentAvg =
      recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const olderAvg =
      older.length > 0
        ? older.reduce((sum, entry) => sum + entry.mood, 0) / older.length
        : recentAvg;

    if (recentAvg > olderAvg + 0.3) return "improving";
    if (recentAvg < olderAvg - 0.3) return "declining";
    return "stable";
  };

  const trend = getMoodTrend();

  return (
    <div className="min-h-screen bg-gradient-mindmate from-mindmate-50 via-background to-calm-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-calm-500" />
              <h1 className="text-xl font-semibold">Mood Tracker</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mood Entry Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-mindmate-500" />
                  How are you feeling?
                </CardTitle>
                <CardDescription>
                  Track your daily mood and emotions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mood Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select your mood
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedMood === mood.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="text-xs font-medium">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    What describes your mood?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? "default" : "outline"
                        }
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Notes (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's on your mind today?"
                    className="w-full p-3 border border-border rounded-md bg-background resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSaveMood}
                  disabled={selectedMood === null}
                  className="w-full"
                >
                  Save Mood Entry
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Average Mood
                      </p>
                      <p className="text-2xl font-bold">{averageMood}/5</p>
                    </div>
                    <Smile className="w-8 h-8 text-mindmate-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Entries
                      </p>
                      <p className="text-2xl font-bold">{moodEntries.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-calm-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Trend
                      </p>
                      <p
                        className={`text-2xl font-bold capitalize ${
                          trend === "improving"
                            ? "text-green-500"
                            : trend === "declining"
                              ? "text-red-500"
                              : "text-yellow-500"
                        }`}
                      >
                        {trend}
                      </p>
                    </div>
                    <TrendingUp
                      className={`w-8 h-8 ${
                        trend === "improving"
                          ? "text-green-500"
                          : trend === "declining"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
                <CardDescription>
                  Your mood patterns over the last 7 entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                {chartData.length > 1 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1, 5]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="hsl(var(--mindmate-500))"
                        strokeWidth={3}
                        dot={{
                          fill: "hsl(var(--mindmate-500))",
                          strokeWidth: 2,
                          r: 6,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Track more moods to see your trends
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodEntries.slice(0, 5).map((entry) => {
                    const moodData = moodEmojis.find(
                      (m) => m.value === entry.mood,
                    );
                    return (
                      <div
                        key={entry.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="text-2xl">{moodData?.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {moodData?.label}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {entry.date.toLocaleDateString()}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {entry.note}
                            </p>
                          )}
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {moodEntries.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No mood entries yet. Start tracking your mood today!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
