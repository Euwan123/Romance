export type MemoryPhoto = {
  id: string;
  src: string;
  caption: string;
  date: string;
};

export type LoveReason = {
  id: string;
  title: string;
  detail: string;
  emoji: string;
};

export type TimelineItem = {
  id: string;
  date: string;
  title: string;
  detail: string;
};

export type PromiseItem = {
  id: string;
  title: string;
  detail: string;
  icon: "heart" | "sparkles" | "flower" | "hand";
};
