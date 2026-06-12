export type StatImpact = {
  efficiency: number;
  csat: number;
  budget: number;
};

export type Option = {
  id: string; // "A", "B", "C", "D"
  text: string;
  isCorrect: boolean;
  impact: StatImpact;
};

export type Scenario = {
  id: number;
  phase: string;
  context: string;
  question: string;
  options: Option[];
  explanation: string;
};

export type GameState = 'intro' | 'playing' | 'feedback' | 'gameover' | 'victory';
