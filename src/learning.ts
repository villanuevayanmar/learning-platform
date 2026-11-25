export type LearningMode = 'adaptive' | 'guided' | 'self-paced';
export type Question = { id: string; prompt: string; code?: string; choices: string[]; answer: number; hint: string; explanation: string; concept: string };
export type AnswerRecord = { questionId: string; selected: number; correct: boolean; independent: boolean };
export const questions: Question[] = [
{id:'whole-number',prompt:'You need to store a person’s age. Which declaration is the best fit?',choices:['float age = 19;','int age = 19;','char age = 19;','void age = 19;'],answer:1,hint:'An age is counted in whole years. Look for the C type made for whole numbers.',explanation:'int stores whole numbers. Since this age has no decimal part, int age = 19; is appropriate.',concept:'Integer variables'},
{id:'decimal-number',prompt:'A temperature reading can be 36.7. Which type should hold it?',choices:['int','char','float','void'],answer:2,hint:'The value has a decimal part, so a whole-number type would lose information.',explanation:'float stores numbers with a fractional part, such as 36.7.',concept:'Floating-point variables'},
{id:'assignment',prompt:'What value does score contain after these statements?',code:'int score = 8;\nscore = score + 2;',choices:['8','2','10','82'],answer:2,hint:'Take the current value, add two, then store the result back in the same variable.',explanation:'score starts at 8. The expression score + 2 becomes 10, and the assignment stores 10.',concept:'Updating a variable'}
];
export function calculateMastery(records: AnswerRecord[], totalQuestions: number): number {
 if (totalQuestions <= 0) return 0;
 const independent = new Set(records.filter(r => r.independent && r.correct).map(r => r.questionId));
 return Math.round(independent.size / totalQuestions * 100);
}
export function evaluateAnswer(question: Question, selected: number): boolean { return Number.isInteger(selected) && selected === question.answer; }
export function getNextQuestionIndex(records: AnswerRecord[], totalQuestions: number): number | null {
 const completed = new Set(records.filter(r => r.correct).map(r => r.questionId));
 const next = questions.findIndex(q => !completed.has(q.id));
 return next === -1 || next >= totalQuestions ? null : next;
}