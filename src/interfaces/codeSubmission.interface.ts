import { Language } from '../enums/language.enum';

export interface CodeSubmission {
  userId: string;
  problemId: string;
  code: string;
  language: Language;
  timestamp: Date;
}
