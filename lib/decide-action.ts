"use server";

import { boolean, choice, decide, score } from "@tanstack/ai";
import type {
  DecisionRequest,
  DecisionResponse,
  Question,
} from "./types";
import { getJevDecider } from "./jev-decider";

export async function makeDecision(
  request: DecisionRequest
): Promise<DecisionResponse> {
  // Giriş doğrulama
  if (!request.state || request.state.trim().length === 0) {
    throw new Error("Durum boş olamaz");
  }

  if (!request.questions || request.questions.length === 0) {
    throw new Error("En az bir karar sorusu gerekli");
  }

  // Soruları doğrula
  for (const q of request.questions) {
    if (!q.field || !q.instructions) {
      throw new Error("Her soruda field ve instructions alanı gerekli");
    }

    if (q.type === "choice") {
      const choiceQ = q as Extract<Question, { type: "choice" }>;
      if (!choiceQ.options || choiceQ.options.length < 2) {
        throw new Error(
          `Choice sorusu "${q.field}" için en az 2 seçenek gerekli`
        );
      }
    }

    if (q.type === "score") {
      const scoreQ = q as Extract<Question, { type: "score" }>;
      if (!scoreQ.levels || scoreQ.levels.length < 2) {
        throw new Error(
          `Score sorusu "${q.field}" için en az 2 seviye gerekli`
        );
      }
    }
  }

  // Soruları TanStack AI formatına çevir
  const questions: Record<string, any> = {};

  for (const q of request.questions) {
    if (q.type === "boolean") {
      questions[q.field] = boolean({
        instructions: q.instructions,
      });
    } else if (q.type === "choice") {
      const choiceQ = q as Extract<Question, { type: "choice" }>;
      const opts: Record<string, string> = {};
      choiceQ.options.forEach((opt) => {
        opts[opt.value] = opt.criteria;
      });
      questions[q.field] = choice({
        instructions: q.instructions,
        options: opts,
      });
    } else if (q.type === "score") {
      const scoreQ = q as Extract<Question, { type: "score" }>;
      const levels = scoreQ.levels.map((l) => l.value);
      questions[q.field] = score({
        instructions: q.instructions,
        levels,
      });
    }
  }

  // Jev karar modelini çağır
  const adapter = await getJevDecider();
  const result = await decide({
    adapter,
    state: request.state,
    questions,
  });

  // Sonuçları arayüz formatına dönüştür
  const results = request.questions.map((q) => {
    const answer = result[q.field];

    if (q.type === "boolean") {
      return {
        field: q.field,
        type: "boolean" as const,
        value: answer.value as boolean,
        probability: answer.probability,
      };
    } else if (q.type === "choice") {
      return {
        field: q.field,
        type: "choice" as const,
        value: answer.value as string,
        probability: answer.probability,
        distribution: (answer as any).probabilities
          ? Object.entries((answer as any).probabilities).map(([val, prob]) => ({
              value: val,
              probability: prob as number,
            }))
          : undefined,
      };
    } else {
      return {
        field: q.field,
        type: "score" as const,
        value: answer.value as string,
        probability: answer.probability,
        score: (answer as any).score || 0,
      };
    }
  });

  return {
    results,
    raw: result,
  };
}
