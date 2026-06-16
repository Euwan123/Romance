export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  body: string;
  mood: string;
};

export const diaryEntries: DiaryEntry[] = [
  {
    id: "d-1",
    date: "The Beginning",
    title: "When We First Met",
    body: "I still remember how natural it felt talking to you. That day quietly became the start of something I never wanted to end.",
    mood: "🌸"
  },
  {
    id: "d-2",
    date: "Study Days",
    title: "Late Nights Together",
    body: "We pushed through deadlines, shared snacks, and kept cheering each other on. Even the hard days felt lighter with you beside me.",
    mood: "📚"
  },
  {
    id: "d-3",
    date: "Graduation",
    title: "We Made It",
    body: "All the effort became real on that stage. I was proud of us, proud of you, and grateful I got to celebrate that win with you.",
    mood: "🎓"
  },
  {
    id: "d-4",
    date: "Everyday",
    title: "Little Things",
    body: "The random laughs, the food trips, the cat moments, the quiet hugs. These are the pages I love most in our story.",
    mood: "❤️"
  }
];
