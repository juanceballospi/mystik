
export interface ZodiacDateBound {
  month: string;
  day: number;
}

export interface ZodiacDate {
  start: ZodiacDateBound;
  end: ZodiacDateBound;
}

export interface ZodiacSign {
  id: string;
  name: string;
  image: string;
  // date: "Mar 21 - Apr 19",
  date: ZodiacDate;
}

export interface Settings {
    date_resolved: string;
    version: string;
}

export interface Engine {
    name: string;
    version: string;
}

export interface Meta {
    request_id: string;
    generated_at: string;
    settings: Settings;
    engine: Engine;
}

export interface Scores {
    overall: number;
    love: number;
    career: number;
    money: number;
    health: number;
}

export interface Reason {
    main: string;
    secondary: string | null;
}

export interface ScoreDriver {
    type: "score";
    key: "love" | "career" | "money" | "health";
    value: number;
}

export interface SkyAspectDriver {
    type: "sky_aspect";
    key: string;
    label: string;
    weight: number;
    intensity: "subtle" | "moderate" | "strong";
    orb_deg: number;
}

export type Driver = ScoreDriver | SkyAspectDriver;

export interface ScoreFactor {
    dimension: "overall" | "love" | "career" | "money" | "health";
    type: "aggregate" | "dimension";
    reason: Reason;
    drivers: Driver[];
}

export interface KeyLabel {
    key: string;
    label: string;
}

export interface TimeWindow {
    display: string;
    start: string;
    end: string;
    tz: string;
}

export interface Lucky {
    color: KeyLabel;
    number: number;
    time_window: TimeWindow;
}

export interface Content {
    text: string;
    theme: string;
    keywords: string[];
    supporting_insights: string[];
}

export interface AstroHighlight {
    type: "moon_sign" | "moon_phase" | "sky_aspect";
    key: string;
    label: string;
}

export interface Astro {
    moon_sign: KeyLabel;
    moon_phase: KeyLabel;
    highlights: AstroHighlight[];
}

export interface HoroscopeData {
    sign: string;
    date: string;
    scores: Scores;
    score_factors: ScoreFactor[];
    lucky: Lucky;
    content: Content;
    astro: Astro;
}

export interface HoroscopeApiResponse {
    meta: Meta;
    data: HoroscopeData;
}