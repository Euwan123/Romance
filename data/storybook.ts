export type StoryBlock =
  | { type: "image"; src: string; alt: string }
  | { type: "text"; content: string };

export type StoryPage = {
  id: string;
  chapter: string;
  page: number;
  heading: string;
  blocks: StoryBlock[];
};

export const storyPages: StoryPage[] = [
  {
    id: "page-1",
    chapter: "Chapter 1 · The Day Everything Changed",
    page: 1,
    heading: "The Day Everything Changed ❤️",
    blocks: [
      {
        type: "image",
        src: "/images/solopic/20Zy.jpg",
        alt: "The beginning of our story"
      },
      {
        type: "text",
        content:
          "When I first met you, I honestly didn't care much. Hilumon man ka, so I didn't really pay attention at first. To me, you were just another classmate. Nothing special, nothing more. But then... next slide please."
      }
    ]
  },
  {
    id: "page-2",
    chapter: "Chapter 1 · The Day Everything Changed",
    page: 2,
    heading: "The Little Moments",
    blocks: [
      {
        type: "text",
        content:
          "We had our moments, you know. We got closer, and I guess our feelings grew,or maybe it was just mine. Still, those ordinary days turned into memories that I can still remember even now. Even the small moments we shared, whether as friends or as a talking stage, meant a lot to me."
      },
      {
        type: "text",
        content:
          "I've never had a girlfriend before, so honestly, I didn't really know what I was doing. I ended up assuming you liked me because you talked to me a lot. Looking back, medyo baga'g nawng ko ato. Anyway, next slide please."
      }
    ]
  },
  {
    id: "page-3",
    chapter: "Chapter 1 · The Day Everything Changed",
    page: 3,
    heading: "Choosing You",
    blocks: [
      {
        type: "text",
        content:
          "As our relationship moved forward, there were times when things were good and times when they weren't. But just because there were bad moments doesn't mean I suddenly disliked you as a person."
      },
      {
        type: "text",
        content:
          "I'm still a person too,I have feelings. When you're upset, I can't just be happy. Of course I get affected. I get sad, worried, angry, jealous, and a lot of other things. I'm not a perfect boyfriend, and I'm definitely not a robot programmed to be happy all the time."
      },
      {
        type: "text",
        content:
          "But that doesn't mean that every time you're mad, I automatically get mad too. I try to think about what's right and what's best to do. I ask myself if I even have the right to be angry in that situation. If I don't, then I let it go."
      }
    ]
  },
  {
    id: "page-4",
    chapter: "Chapter 2 · Chasing Dreams Together",
    page: 4,
    heading: "Chasing Dreams Together ✨",
    blocks: [
      {
        type: "image",
        src: "/images/solopic/ProjectZy.jpg",
        alt: "Working hard side by side"
      },
      {
        type: "text",
        content:
          "All I wanted was for you to help me achieve something I wanted, because sometimes I felt like I wasn't getting much support. I just didn't show it. I don't know if you were showing support from your side, but sometimes I felt empty. I hope you understand what I mean."
      },
      {
        type: "text",
        content:
          "And yes, there were many times when you supported me, and I'm genuinely thankful for that."
      }
    ]
  },
  {
    id: "page-5",
    chapter: "Chapter 2 · Chasing Dreams Together",
    page: 5,
    heading: "Side by Side",
    blocks: [
      {
        type: "text",
        content:
          "I hope we continue to grow together, side by side, supporting each other. I know there are times when I admit that I don't always know what's right. Sometimes I'm wrong. Sometimes I'm completely wrong."
      },
      {
        type: "text",
        content:
          "The truth is, I don't know what our future looks like yet. I don't know if we're on the right path or the wrong one. I don't know if this is the right time or the wrong time. But despite all that uncertainty, I'm excited to see both of us grow and become better versions of ourselves."
      }
    ]
  },
  {
    id: "page-6",
    chapter: "Chapter 3 · We Did It",
    page: 6,
    heading: "We Did It 🎓",
    blocks: [
      {
        type: "image",
        src: "/images/GraduationPics/Certificate.jpg",
        alt: "Graduation certificate in your hands"
      },
      {
        type: "text",
        content:
          "I don't know why I look like a kalabira in this picture. Anyway, I'm really proud of us here. All the hard work we put in finally paid off. Every sacrifice was worth it."
      },
      {
        type: "text",
        content:
          "I can't exactly say we had sleepless nights because nakatulog man ta, but everything we did led us to this moment."
      }
    ]
  },
  {
    id: "page-7",
    chapter: "Chapter 3 · We Did It",
    page: 7,
    heading: "One Of Our Biggest Milestones",
    blocks: [
      {
        type: "image",
        src: "/images/GraduationPics/GraduationPic.jpg",
        alt: "Graduation day together"
      },
      {
        type: "text",
        content:
          "We didn't just graduate from school. We made it through parts of our lives that could have broken us. Instead, I think those challenges made us stronger."
      }
    ]
  },
  {
    id: "page-8",
    chapter: "Chapter 4 · Living This Life With You",
    page: 8,
    heading: "Living This Life With You",
    blocks: [
      {
        type: "image",
        src: "/gallery/DuoPic/IMG_20240826_205852_transcpr.jpg",
        alt: "Us together in a quiet moment"
      },
      {
        type: "text",
        content:
          "Life later on, naa nay home diba. We decided to live together, and that's one of the biggest milestones in our lives. Having our own house so we can finally be independent and, according to Bing, maka-yoti na lagi daw. I still don't know which Bing, Bing Euwan or Bing Zy."
      }
    ]
  },
  {
    id: "page-9",
    chapter: "Chapter 4 · Living This Life With You",
    page: 9,
    heading: "You Are My Home",
    blocks: [
      {
        type: "text",
        content:
          "I hope you weren't upset when I asked you to go home. I thought we had an agreement before that after your classes were done, you would head home."
      },
      {
        type: "text",
        content:
          "Of course I want you here, but I needed some time to think and have a little breathing space. I'll explain it better in the next two slides, so don't worry. I just hope you'll understand what I'm trying to say."
      }
    ]
  },
  {
    id: "page-10",
    chapter: "Chapter 5 · The Future I Pray For",
    page: 10,
    heading: "The Future I Pray For",
    blocks: [
      {
        type: "image",
        src: "/gallery/DuoPic/IMG_20260329_163427.jpg",
        alt: "Us dreaming about the future"
      },
      {
        type: "text",
        content:
          "When I think about our future, I don't just think about it, I also act on it, little by little. There's no need to rush."
      },
      {
        type: "text",
        content:
          "Yes, nagpa-INC ko because nasakpan ta and it felt sudden, but that doesn't mean I was forced. I still had the choice to keep us hidden for a few more months, but I decided not to because kapoy na pud."
      },
      {
        type: "text",
        content:
          "At first, I didn't really believe or understand what was being taught in INC, which is normal. That's why I started researching the beliefs, doctrines, and teachings myself. Anyway, next page."
      }
    ]
  },
  {
    id: "page-11",
    chapter: "Chapter 5 · The Future I Pray For",
    page: 11,
    heading: "Our Agreement",
    blocks: [
      {
        type: "text",
        content: "I hope you don't get offended by this part."
      },
      {
        type: "text",
        content:
          "Remember our agreement? I would become INC, but I wouldn't be involved in church activities outside of worship services. I specifically said I didn't want to become a kalihim or anything similar."
      },
      {
        type: "text",
        content:
          "But after becoming a sinusubok, I was surprised when you immediately told me that after two weeks of rest, I'd become a kalihim because batak na daw ko."
      },
      {
        type: "text",
        content:
          "That really caught me off guard. Even so, I decided to go with the flow since our school situation was already a mess anyway. I thought I might as well give it a try."
      },
      {
        type: "text",
        content:
          "Honestly, the experience has been a roller coaster. The people are nice, there aren't really any major issues, and it isn't particularly stressful, but... next slide."
      }
    ]
  },
  {
    id: "page-12",
    chapter: "Chapter 5 · The Future I Pray For",
    page: 12,
    heading: "The Agreement We Made",
    blocks: [
      {
        type: "text",
        content:
          "I asked you before if you felt any remorse, but I never really got an answer."
      },
      {
        type: "text",
        content:
          "Correct me if I'm wrong, but you invited me to become a kalihim because you needed help. You even told Kuya Poy that you invited me because you needed help."
      },
      {
        type: "text",
        content: "So why does it sometimes feel like I'm the one who owes something?"
      },
      {
        type: "text",
        content:
          "Imagine an agreement being broken so that I could help, but afterward it feels like I'm the one expected to keep giving more. You broke the agreement because you needed help, yet sometimes it feels like the repayment I got was being constantly bossed around as a kalihim."
      }
    ]
  },
  {
    id: "page-13",
    chapter: "Chapter 5 · The Future I Pray For",
    page: 13,
    heading: "Where I'm Coming From",
    blocks: [
      {
        type: "image",
        src: "/gallery/SoloPic/IMG_20260321_020809.jpg",
        alt: "A quiet moment"
      },
      {
        type: "text",
        content:
          "I hope you understand where I'm coming from because this is honestly how I feel."
      },
      {
        type: "text",
        content:
          "I don't mind being asked to do things. Even if it's 100 times, that's fine. Just please do it nicely."
      },
      {
        type: "text",
        content:
          "I'm not the one who needed help. I'm the one who offered help. So I hope that in return, you treat me as your equal."
      },
      {
        type: "text",
        content:
          "I understand that you're the pangulo, but a leader isn't a boss. A leader guides people; they don't order people around."
      },
      {
        type: "text",
        content:
          "That's one of the reasons I want some time alone. If I'm already dealing with attitude here at home and then experiencing the same thing in church, where exactly am I supposed to breathe?"
      }
    ]
  },
  {
    id: "page-14",
    chapter: "Chapter 6 · What I Need From Us",
    page: 14,
    heading: "Needing Space",
    blocks: [
      {
        type: "text",
        content:
          "I always want to be with you no matter what. But if the situation at home and in church feels exactly the same, then sometimes it's better to pause things at home so I can breathe."
      },
      {
        type: "text",
        content: "That's one of the main reasons why I wanted some space."
      },
      {
        type: "text",
        content:
          "I still don't understand why it feels like I'm always the one expected to change. Tell me honestly, what did I do? How am I the villain for simply asking for a little breathing room?"
      }
    ]
  },
  {
    id: "page-15",
    chapter: "Chapter 6 · What I Need From Us",
    page: 15,
    heading: "How I Feel",
    blocks: [
      {
        type: "text",
        content:
          "I'm sorry that this romance diary turned into a rant, but this is the way I wanted to express my feelings."
      },
      {
        type: "text",
        content:
          "I don't know if you'll fully understand everything I'm saying, but what I've written here is only the tip of the iceberg."
      },
      {
        type: "text",
        content:
          "I hope that someday you'll realize that being maldita isn't cool. It's not impressive. Nobody's going to say, \"Wow, grabe ka-maldita ana niya.\""
      },
      {
        type: "text",
        content:
          "It's simply toxic, and it hurts the people around you, and especially me."
      }
    ]
  },
  {
    id: "page-16",
    chapter: "Chapter 6 · What I Need From Us",
    page: 16,
    heading: "Growing Together",
    blocks: [
      {
        type: "text",
        content:
          "I love you very much, Zy, but I think it's time for both of us to grow."
      },
      {
        type: "text",
        content:
          "Please don't just think about your own side, try to consider mine too."
      },
      {
        type: "text",
        content:
          "Sometimes I feel embarrassed in front of others because of the way I'm treated in kalihim. It genuinely hurts."
      },
      {
        type: "text",
        content:
          "For example, the flowers issue. You would tell other people that I never gave you flowers. But tell me honestly, why would that be the thing that defines everything?"
      },
      {
        type: "text",
        content:
          "I've already given you ML skins worth around 3,000 pesos in total, while flowers cost around 200 pesos."
      },
      {
        type: "text",
        content:
          "Why does it feel like the flowers matter more than everything else I've already given? Especially when I know you genuinely wanted those skins too."
      }
    ]
  },
  {
    id: "page-17",
    chapter: "Chapter 6 · What I Need From Us",
    page: 17,
    heading: "My Best",
    blocks: [
      {
        type: "image",
        src: "/gallery/SoloPic/IMG_20250213_140257_transcpr.jpg",
        alt: "Flowers for you"
      },
      {
        type: "text",
        content:
          "You can call me mamoyboy if you want. I honestly don't care about that word anymore."
      },
      {
        type: "text",
        content:
          "But giving gifts is my way of showing gratitude and appreciation to you."
      },
      {
        type: "text",
        content:
          "What hurts is when you say that you've received nothing from me, and when I remind you of the things I've already given, I'm immediately called mamoyboy."
      },
      {
        type: "text",
        content:
          "That feels unfair and honestly toxic."
      },
      {
        type: "text",
        content:
          "I'm not saying I'm perfect, but I don't think every issue in our relationship can be solved by telling me to change."
      }
    ]
  },
  {
    id: "page-18",
    chapter: "Chapter 7 · Always Yours",
    page: 18,
    heading: "Trying My Best",
    blocks: [
      {
        type: "text",
        content: "I hope we last forever."
      },
      {
        type: "text",
        content:
          "I hope you realize that I'm also trying my best to keep us together. It's not just you carrying this relationship."
      },
      {
        type: "text",
        content:
          "I've followed you through so many things you wanted, but sometimes it feels like instead of gaining something, I've lost something, my pride and dignity."
      },
      {
        type: "text",
        content:
          "You act cheerful in church, but sometimes you don't realize that you've already hurt me. That's one of the reasons why I'm quiet sometimes."
      }
    ]
  },
  {
    id: "page-19",
    chapter: "Chapter 7 · Always Yours",
    page: 19,
    heading: "My Reality",
    blocks: [
      {
        type: "image",
        src: "/gallery/DuoPic/IMG_20241226_142444_transcpr.jpg",
        alt: "Us with our cat"
      },
      {
        type: "text",
        content: "This isn't a hate message."
      },
      {
        type: "text",
        content: "This is simply how I feel. This is my reality."
      },
      {
        type: "text",
        content:
          "Please stop asking me to fix everything by changing myself. Some things can only be changed by looking at ourselves honestly."
      },
      {
        type: "text",
        content:
          "I'm sorry for every mistake I've made. I'm sorry if you thought this website or diary would only be about love. I'm sorry for the times I lied. I'm sorry if I wasn't enough."
      },
      {
        type: "text",
        content:
          "But please know that I have been trying my best, even when it feels like my best isn't enough."
      }
    ]
  }
];
