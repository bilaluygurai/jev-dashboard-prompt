export type QuestionType = "boolean" | "choice" | "score";

export interface BaseQuestion {
  id: string;
  field: string;
  type: QuestionType;
  instructions: string;
}

export interface BooleanQuestion extends BaseQuestion {
  type: "boolean";
}

export interface ChoiceOption {
  value: string;
  criteria: string;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  options: ChoiceOption[];
}

export interface ScoreLevel {
  value: string;
  criteria: string;
}

export interface ScoreQuestion extends BaseQuestion {
  type: "score";
  levels: ScoreLevel[];
}

export type Question = BooleanQuestion | ChoiceQuestion | ScoreQuestion;

export interface DecisionRequest {
  state: string;
  questions: Question[];
}

export interface BooleanResult {
  field: string;
  type: "boolean";
  value: boolean;
  probability: number;
}

export interface ChoiceResult {
  field: string;
  type: "choice";
  value: string;
  probability: number;
  distribution?: Array<{ value: string; probability: number }>;
}

export interface ScoreResult {
  field: string;
  type: "score";
  value: string;
  probability: number;
  score: number;
}

export type DecisionResult = BooleanResult | ChoiceResult | ScoreResult;

export interface DecisionResponse {
  results: DecisionResult[];
  raw: any;
}
