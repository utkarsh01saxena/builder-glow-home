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
  Brain,
  MessageCircle,
  TrendingUp,
  BookOpen,
  Sparkles,
  Heart,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-mindmate from-mindmate-50 via-background to-calm-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mindmate-500 to-calm-500 flex items-center justify-center animate-breathe">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Mind‑Mate</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/chat"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Chat
            </Link>
            <Link
              to="/mood"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Mood Tracker
            </Link>
            <Link
              to="/journal"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Journal
            </Link>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-mindmate-100 text-mindmate-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Mental Wellness
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Personal
            <span className="gradient-text block">Mental Wellness</span>
            Companion
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Support your mental wellbeing through empathetic AI conversations,
            mood tracking, and guided journaling. Built with care for your
            emotional journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/chat">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/mood">
                <TrendingUp className="w-5 h-5 mr-2" />
                Track Mood
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for mental wellness
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to support your emotional wellbeing
              and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* AI Chat Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-mindmate-200/50 hover:border-mindmate-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-mindmate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-mindmate-600" />
                </div>
                <CardTitle className="text-xl">
                  Empathetic AI Assistant
                </CardTitle>
                <CardDescription>
                  Talk through feelings, stress, and anxiety with a
                  compassionate AI companion that truly listens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/chat">Start Conversation</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mood Tracking Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-calm-200/50 hover:border-calm-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-calm-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-calm-600" />
                </div>
                <CardTitle className="text-xl">
                  Mood Tracking & Analytics
                </CardTitle>
                <CardDescription>
                  Log daily emotions and visualize patterns to better understand
                  your mental wellness journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/mood">Track Mood</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Journaling Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-mindmate-200/50 hover:border-mindmate-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-mindmate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-mindmate-600" />
                </div>
                <CardTitle className="text-xl">Guided Journaling</CardTitle>
                <CardDescription>
                  Reflect on thoughts and experiences with structured prompts
                  designed for emotional clarity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/journal">Start Journaling</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose Mind-Mate?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with privacy, empathy, and effectiveness at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-mindmate-100 flex items-center justify-center mx-auto mb-4 animate-float">
                <Shield className="w-8 h-8 text-mindmate-600" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your data stays local and secure. No cloud storage of personal
                conversations.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full bg-calm-100 flex items-center justify-center mx-auto mb-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Heart className="w-8 h-8 text-calm-600" />
              </div>
              <h3 className="font-semibold mb-2">Empathetic AI</h3>
              <p className="text-sm text-muted-foreground">
                Powered by advanced AI trained specifically for mental wellness
                support.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full bg-mindmate-100 flex items-center justify-center mx-auto mb-4 animate-float"
                style={{ animationDelay: "2s" }}
              >
                <Zap className="w-8 h-8 text-mindmate-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Access</h3>
              <p className="text-sm text-muted-foreground">
                Available 24/7 whenever you need support or want to reflect.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full bg-calm-100 flex items-center justify-center mx-auto mb-4 animate-float"
                style={{ animationDelay: "3s" }}
              >
                <Sparkles className="w-8 h-8 text-calm-600" />
              </div>
              <h3 className="font-semibold mb-2">Personalized</h3>
              <p className="text-sm text-muted-foreground">
                Adapts to your unique needs and provides tailored guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your wellness journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of people already improving their mental wellbeing
              with Mind-Mate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/chat">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Free to use
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Privacy focused
              </Badge>
              <Badge variant="secondary" className="text-sm">
                AI-powered
              </Badge>
              <Badge variant="secondary" className="text-sm">
                No signup required
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-mindmate-500 to-calm-500 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Mind‑Mate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting mental wellness through AI and empathy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
