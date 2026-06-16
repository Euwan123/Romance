export type GalleryTheme = {
  emoji: string;
  gradient: string;
  accent: string;
  glow: string;
  cardBg: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  subtitle: string;
  folder: string;
  theme: GalleryTheme;
};

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "cats",
    title: "Cats",
    subtitle: "Our little fur babies",
    folder: "Cats",
    theme: {
      emoji: "🐱",
      gradient: "from-[#ffb86c] to-[#ff8fab]",
      accent: "#ffd4a8",
      glow: "rgba(255, 184, 108, 0.45)",
      cardBg: "rgba(255, 212, 168, 0.14)"
    }
  },
  {
    id: "us-together",
    title: "Us Together",
    subtitle: "Moments with you",
    folder: "DuoPic",
    theme: {
      emoji: "💑",
      gradient: "from-[#ff8ba8] to-[#b76e79]",
      accent: "#ffd7e1",
      glow: "rgba(255, 139, 168, 0.45)",
      cardBg: "rgba(255, 215, 225, 0.14)"
    }
  },
  {
    id: "food-trip",
    title: "Food Trip",
    subtitle: "Dates and bites",
    folder: "FoodsTogether",
    theme: {
      emoji: "🍜",
      gradient: "from-[#f6c177] to-[#e88d67]",
      accent: "#ffe8c8",
      glow: "rgba(246, 193, 119, 0.45)",
      cardBg: "rgba(255, 232, 200, 0.14)"
    }
  },
  {
    id: "graduation",
    title: "Graduation",
    subtitle: "Proud milestones",
    folder: "GraduationPics",
    theme: {
      emoji: "🎓",
      gradient: "from-[#c9a227] to-[#5c4d7a]",
      accent: "#f4e4a6",
      glow: "rgba(201, 162, 39, 0.4)",
      cardBg: "rgba(244, 228, 166, 0.12)"
    }
  },
  {
    id: "solo",
    title: "Solo",
    subtitle: "Beautiful you and Handsome me",
    folder: "SoloPic",
    theme: {
      emoji: "✨",
      gradient: "from-[#c4b5fd] to-[#f0abfc]",
      accent: "#ede9fe",
      glow: "rgba(196, 181, 253, 0.4)",
      cardBg: "rgba(237, 233, 254, 0.14)"
    }
  },
  {
    id: "random",
    title: "Random",
    subtitle: "Little surprises",
    folder: "Others",
    theme: {
      emoji: "🎀",
      gradient: "from-[#7dd3fc] to-[#f472b6]",
      accent: "#e0f2fe",
      glow: "rgba(125, 211, 252, 0.4)",
      cardBg: "rgba(224, 242, 254, 0.14)"
    }
  }
];
