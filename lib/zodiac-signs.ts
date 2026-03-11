export interface ZodiacDateBound {
  month: string;
  day: number;
}

export interface ZodiacDate {
  start: ZodiacDateBound;
  end: ZodiacDateBound;
}

export interface ZodiacSign {
  id: number;
  name: string;
  image: string;
  // date: "Mar 21 - Apr 19",
  date: ZodiacDate;
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 1,
    name: "Aries",
    image: "/zodiac-signs/aries.png",
    // date: "Mar 21 - Apr 19",
    date: {
      start: {
        month: "Mar",
        day: 21,
      },
      end: {
        month: "Apr",
        day: 19,
      },
    },
  },
  {
    id: 2,
    name: "Taurus",
    image: "/zodiac-signs/taurus.png",
    // date: "Apr 20 - May 20",
    date: {
      start: {
        month: "Apr",
        day: 20,
      },
      end: {
        month: "May",
        day: 20,
      },
    },
  },
  {
    id: 3,
    name: "Gemini",
    image: "/zodiac-signs/gemini.png",
    // date: "May 21 - Jun 20",
    date: {
      start: {
        month: "May",
        day: 21,
      },
      end: {
        month: "Jun",
        day: 20,
      },
    },
  },
  {
    id: 4,
    name: "Cancer",
    image: "/zodiac-signs/cancer.png",
    // date: "Jun 21 - Jul 22",
    date: {
      start: {
        month: "Jun",
        day: 21,
      },
      end: {
        month: "Jul",
        day: 22,
      },
    },
  },
  {
    id: 5,
    name: "Leo",
    image: "/zodiac-signs/leo.png",
    // date: "Jul 23 - Aug 22",
    date: {
      start: {
        month: "Jul",
        day: 23,
      },
      end: {
        month: "Aug",
        day: 22,
      },
    },
  },
  {
    id: 6,
    name: "Virgo",
    image: "/zodiac-signs/virgo.png",
    // date: "Aug 23 - Sep 22",
    date: {
      start: {
        month: "Aug",
        day: 23,
      },
      end: {
        month: "Sep",
        day: 22,
      },
    },
  },
  {
    id: 7,
    name: "Libra",
    image: "/zodiac-signs/libra.png",
    // date: "Sep 23 - Oct 22",
    date: {
      start: {
        month: "Sep",
        day: 23,
      },
      end: {
        month: "Oct",
        day: 22,
      },
    },
  },
  {
    id: 8,
    name: "Scorpio",
    image: "/zodiac-signs/scorpio.png",
    // date: "Oct 23 - Nov 21",
    date: {
      start: {
        month: "Oct",
        day: 23,
      },
      end: {
        month: "Nov",
        day: 21,
      },
    },
  },
  {
    id: 9,
    name: "Sagittarius",
    image: "/zodiac-signs/sagittarius.png",
    // date: "Nov 22 - Dec 21",
    date: {
      start: {
        month: "Nov",
        day: 22,
      },
      end: {
        month: "Dec",
        day: 21,
      },
    },
  },
  {
    id: 10,
    name: "Capricorn",
    image: "/zodiac-signs/capricorn.png",
    // date: "Dec 22 - Jan 19",
    date: {
      start: {
        month: "Dec",
        day: 22,
      },
      end: {
        month: "Jan",
        day: 19,
      },
    },
  },
  {
    id: 11,
    name: "Aquarius",
    image: "/zodiac-signs/aquarius.png",
    // date: "Jan 20 - Feb 18",
    date: {
      start: {
        month: "Jan",
        day: 20,
      },
      end: {
        month: "Feb",
        day: 18,
      },
    },
  },
  {
    id: 12,
    name: "Pisces",
    image: "/zodiac-signs/pisces.png",
    // date: "Feb 19 - Mar 20",
    date: {
      start: {
        month: "Feb",
        day: 19,
      },
      end: {
        month: "Mar",
        day: 20,
      },
    },
  },
];
