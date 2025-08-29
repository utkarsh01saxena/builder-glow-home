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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Save,
  RefreshCw,
  Calendar,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface JournalEntry {
  id: string;
  prompt: string;
  content: string;
  date: Date;
  category: string;
}

const journalPrompts = {
  gratitude: [
    "What are three things you're grateful for today?",
    "Describe a moment from this week that brought you joy.",
    "Who in your life are you most thankful for and why?",
    "What simple pleasure made you smile recently?",
    "How has someone shown you kindness lately?",
  ],
  reflection: [
    "What did you learn about yourself today?",
    "Describe a challenge you overcame recently. How did it make you stronger?",
    "What patterns do you notice in your thoughts or behaviors?",
    "How have you grown in the past month?",
    "What would you tell your younger self about handling difficult situations?",
  ],
  goals: [
    "What's one small step you can take today toward a goal that matters to you?",
    "Describe your ideal day. What would it include?",
    "What habit would you like to develop or change?",
    "How do you want to feel at the end of this week?",
    "What's something you've been putting off that you could start today?",
  ],
  emotions: [
    "What emotions have you experienced today? What triggered them?",
    "Describe a time when you felt truly at peace.",
    "How do you typically handle stress? What works best for you?",
    "What's one emotion you'd like to experience more of?",
    "Write about a recent situation that challenged your emotional well-being.",
  ],
  creativity: [
    "If you could have any superpower, what would it be and how would you use it?",
    "Describe your perfect creative space.",
    "What's a story only you can tell?",
    "If you could have coffee with anyone, who would it be and what would you discuss?",
    "Write about a place that makes you feel inspired.",
  ],
};

const categories = Object.keys(journalPrompts) as Array<
  keyof typeof journalPrompts
>;

export default function Journal() {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("gratitude");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAllEntries, setShowAllEntries] = useState(false);

  // Load journal data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mindmate-journal-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(
        parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        })),
      );
    }
  }, []);

  // Save journal data to localStorage
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("mindmate-journal-data", JSON.stringify(entries));
    }
  }, [entries]);

  // Set initial prompt
  useEffect(() => {
    generateNewPrompt();
  }, []);

  const generateNewPrompt = () => {
    const prompts =
      journalPrompts[currentCategory as keyof typeof journalPrompts];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const handleSaveEntry = () => {
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt,
      content: content.trim(),
      date: new Date(),
      category: currentCategory,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setContent("");
    generateNewPrompt();
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      gratitude: "bg-green-100 text-green-700",
      reflection: "bg-blue-100 text-blue-700",
      goals: "bg-purple-100 text-purple-700",
      emotions: "bg-pink-100 text-pink-700",
      creativity: "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

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
              <BookOpen className="w-6 h-6 text-mindmate-500" />
              <h1 className="text-xl font-semibold">Guided Journal</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Writing Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-mindmate-500" />
                    Today's Prompt
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateNewPrompt}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Prompt
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Choose a category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={
                          currentCategory === category ? "default" : "outline"
                        }
                        className="cursor-pointer hover:bg-primary/80 capitalize"
                        onClick={() => {
                          setCurrentCategory(category);
                          const prompts = journalPrompts[category];
                          const randomPrompt =
                            prompts[Math.floor(Math.random() * prompts.length)];
                          setCurrentPrompt(randomPrompt);
                        }}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Current Prompt */}
                <div className="p-4 bg-mindmate-50 rounded-lg border border-mindmate-200">
                  <p className="text-mindmate-700 font-medium">
                    {currentPrompt}
                  </p>
                </div>

                {/* Writing Area */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your thoughts
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Take your time to reflect and write..."
                    className="min-h-[300px] resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">
                      {content.length} characters
                    </span>
                    <Button
                      onClick={handleSaveEntry}
                      disabled={!content.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journal History */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-calm-500" />
                  Your Entries
                </CardTitle>
                <CardDescription>
                  {entries.length} journal{" "}
                  {entries.length === 1 ? "entry" : "entries"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entries
                    .slice(0, showAllEntries ? entries.length : 5)
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getCategoryColor(entry.category)}>
                            {entry.category}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-2 line-clamp-2">
                          {entry.prompt}
                        </p>
                        <p className="text-sm mb-2 line-clamp-3">
                          {entry.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.date.toLocaleDateString()} at{" "}
                          {entry.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}

                  {entries.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No journal entries yet.</p>
                      <p className="text-sm">
                        Start writing to begin your journey!
                      </p>
                    </div>
                  )}

                  {entries.length > 5 && !showAllEntries && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowAllEntries(true)}
                    >
                      Show All {entries.length} Entries
                    </Button>
                  )}

                  {showAllEntries && entries.length > 5 && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowAllEntries(false)}
                    >
                      Show Less
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            {entries.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Writing Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Entries
                      </span>
                      <span className="font-medium">{entries.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        This Week
                      </span>
                      <span className="font-medium">
                        {
                          entries.filter(
                            (entry) =>
                              new Date().getTime() - entry.date.getTime() <
                              7 * 24 * 60 * 60 * 1000,
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Average Length
                      </span>
                      <span className="font-medium">
                        {Math.round(
                          entries.reduce(
                            (sum, entry) => sum + entry.content.length,
                            0,
                          ) / entries.length,
                        )}{" "}
                        chars
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
