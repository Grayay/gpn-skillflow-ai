import {
  buddyResponses,
  careerResponses,
  generatedCourse,
  knowledgeAnswers,
} from './platformData';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function askCareerCoach(prompt: string) {
  await wait(720);
  return careerResponses[prompt] ?? careerResponses.default;
}

export async function askBuddy(prompt: string) {
  await wait(640);
  return buddyResponses[prompt] ?? buddyResponses.default;
}

export async function askKnowledgeAgent(query: string) {
  await wait(680);
  const normalized = query.toLowerCase();
  if (normalized.includes('доступ')) return knowledgeAnswers.access;
  if (normalized.includes('грейд') || normalized.includes('senior')) return knowledgeAnswers.grade;
  if (normalized.includes('безопас') || normalized.includes('пдн') || normalized.includes('иб')) {
    return knowledgeAnswers.security;
  }
  if (normalized.includes('онборд') || normalized.includes('нович')) return knowledgeAnswers.onboarding;
  return knowledgeAnswers.default;
}

export async function generateCourseFromRegulation(_: string) {
  await wait(900);
  return generatedCourse;
}
