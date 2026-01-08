
export interface CodeFile {
  name: string;
  language: string;
  content: string;
  description: string;
}

export enum AssessmentTab {
  OVERVIEW = 'overview',
  CODE = 'code',
  DOCS = 'docs',
  TESTING = 'testing',
  PLAYGROUND = 'playground'
}

export interface Task {
  id: number;
  title: string;
  content: string;
  summary?: string;
  category?: string;
  created_at: string;
}
