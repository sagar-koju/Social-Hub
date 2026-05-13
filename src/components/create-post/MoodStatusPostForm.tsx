"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const moods = [
  { emoji: "😊", label: "Happy", color: "from-yellow-400 to-yellow-500" },
  { emoji: "😂", label: "Laughing", color: "from-yellow-300 to-orange-400" },
  { emoji: "😍", label: "Loved", color: "from-pink-400 to-red-400" },
  { emoji: "😢", label: "Sad", color: "from-blue-400 to-blue-500" },
  { emoji: "😤", label: "Angry", color: "from-red-500 to-orange-500" },
  { emoji: "😴", label: "Tired", color: "from-indigo-400 to-purple-500" },
  { emoji: "🤔", label: "Thinking", color: "from-cyan-400 to-blue-400" },
  { emoji: "😎", label: "Cool", color: "from-green-400 to-emerald-500" },
];

const activities = [
  "🎮 Playing games",
  "🎵 Listening to music",
  "📚 Reading",
  "🎬 Watching TV",
  "🏃 Exercising",
  "🍽️ Eating",
  "💼 Working",
  "🎨 Creating",
];

export default function MoodStatusPostForm() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handlePost = () => {
    if (selectedMood) {
      console.log("Mood Post:", { mood: selectedMood, activity: selectedActivity, message });
      setSelectedMood(null);
      setSelectedActivity(null);
      setMessage("");
      // Handle post submission here
    }
  };

  const selectedMoodData = moods.find((m) => m.emoji === selectedMood);
  const isValid = selectedMood !== null;

  return (
    <div className="space-y-4">
      {/* Selected Mood Display */}
      {selectedMood && selectedMoodData && (
        <div className={`p-6 rounded-xl bg-linear-to-r ${selectedMoodData.color} text-center text-white`}>
          <div className="text-6xl mb-2">{selectedMood}</div>
          <div className="font-semibold">{selectedMoodData.label}</div>
        </div>
      )}

      {/* Mood Selector */}
      <div>
        <label className="text-sm font-medium text-zinc-300">How are you feeling?</label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {moods.map((mood) => (
            <button
              key={mood.emoji}
              onClick={() => setSelectedMood(mood.emoji)}
              className={`rounded-lg p-3 text-2xl transition ${
                selectedMood === mood.emoji
                  ? "bg-white/20 ring-2 ring-white/40 scale-110"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Selector */}
      <div>
        <label className="text-sm font-medium text-zinc-300">What are you doing? (Optional)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {activities.map((activity) => (
            <button
              key={activity}
              onClick={() => setSelectedActivity(selectedActivity === activity ? null : activity)}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                selectedActivity === activity
                  ? "bg-indigo-500/30 border border-indigo-500/50 text-indigo-200"
                  : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10"
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-sm font-medium text-zinc-300">Add a message (Optional)</label>
        <Textarea
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 min-h-24 resize-none bg-white/5 border-white/10 text-white placeholder-zinc-500"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          onClick={handlePost}
          disabled={!isValid}
          className="flex-1 bg-linear-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90"
        >
          Share Status
        </Button>
      </div>
    </div>
  );
}
