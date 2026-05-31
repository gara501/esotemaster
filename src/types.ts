export type StudyMode =
  | 'general'
  | 'extract'
  | 'tarot'
  | 'cabala'
  | 'alquimia'
  | 'comparative';

export interface AskRequest {
  question: string;
  mode: StudyMode;
}

export interface AskResponse {
  result?: unknown;
}

export interface SourceUsed {
  book?: string;
  page?: string | number | null;
}

export interface Comparison {
  topic?: string;
  tradition_a?: string;
  tradition_b?: string;
  similarity?: string;
  difference?: string;
}

export interface StandardModelResult {
  title?: string;
  mode?: Exclude<StudyMode, 'extract'> | StudyMode;
  short_answer?: string;
  historical_context?: string;
  symbolic_interpretation?: string;
  expanded_analysis?: string;
  key_concepts?: string[];
  reflection?: string;
  comparisons?: Comparison[];
  sources_used?: SourceUsed[];
}

export interface ExtractItem {
  book?: string;
  page?: string | number;
  text?: string;
}

export interface ExtractModelResult {
  title?: string;
  mode: 'extract';
  found?: boolean;
  matched_query?: string;
  extracts?: ExtractItem[];
  notes?: string;
}

export type ModelResult = StandardModelResult | ExtractModelResult;

export interface ModeOption {
  value: StudyMode;
  label: string;
  description: string;
}
