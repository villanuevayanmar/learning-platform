import { describe, expect, it } from 'vitest';
import { calculateMastery, evaluateAnswer, getNextQuestionIndex, questions, type AnswerRecord } from './learning';
describe('learning engine', () => {
 it('accepts only the correct integer answer', () => { expect(evaluateAnswer(questions[0],1)).toBe(true); expect(evaluateAnswer(questions[0],0)).toBe(false); expect(evaluateAnswer(questions[0],1.5)).toBe(false); });
 it('counts independent correct answers only', () => {
  const records: AnswerRecord[] = [{questionId:'whole-number',selected:1,correct:true,independent:true},{questionId:'decimal-number',selected:2,correct:true,independent:false}];
  expect(calculateMastery(records,3)).toBe(33); expect(calculateMastery([],0)).toBe(0);
 });
 it('keeps incorrect answers available and skips correct answers', () => {
  expect(getNextQuestionIndex([],3)).toBe(0);
  expect(getNextQuestionIndex([{questionId:'whole-number',selected:1,correct:true,independent:true}],3)).toBe(1);
  expect(getNextQuestionIndex([{questionId:'whole-number',selected:0,correct:false,independent:false}],3)).toBe(0);
 });
 it('returns null when every question is correct', () => {
  const records = questions.map(q => ({questionId:q.id,selected:q.answer,correct:true,independent:true}));
  expect(getNextQuestionIndex(records,3)).toBeNull();
 });
});