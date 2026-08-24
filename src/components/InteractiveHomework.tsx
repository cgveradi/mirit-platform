"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { supabase } from "@/lib/supabase";

export type InteractiveQuestion = {
  _key: string;
  questionType: "shortAnswer" | "multipleChoice" | "fillBlank";
  prompt: string;
  hint?: string;
  acceptedAnswers?: string[];
  options?: { _key: string; label: string; isCorrect?: boolean }[];
  explanation?: string;
};

type InteractiveHomeworkProps = {
  itemId: string;
  questions: InteractiveQuestion[];
};

type CheckResults = Record<string, boolean>;

function normalizeAnswer(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

export default function InteractiveHomework({ itemId, questions }: InteractiveHomeworkProps) {
  const t = useTranslations("classroom.exercise");
  const storageKey = `mirit-homework-${itemId}`;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [studentName, setStudentName] = useState("");
  const [checkResults, setCheckResults] = useState<CheckResults | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    let savedAnswers: Record<string, string> | null = null;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) savedAnswers = JSON.parse(saved) as Record<string, string>;
    } catch {
      // A blocked or invalid local store should not prevent the exercise from working.
    }
    if (!savedAnswers) return;
    const timer = window.setTimeout(() => setAnswers(savedAnswers ?? {}), 0);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {
      // Progress saving is a convenience; the form remains usable without it.
    }
  }, [answers, storageKey]);

  const completedCount = useMemo(() => questions.filter((question) => answers[question._key]?.trim()).length, [answers, questions]);
  const score = checkResults ? Object.values(checkResults).filter(Boolean).length : 0;

  function answerQuestion(questionKey: string, value: string) {
    setAnswers((current) => ({ ...current, [questionKey]: value }));
    setCheckResults(null);
    setSubmissionStatus("idle");
  }

  function checkAnswers() {
    const results: CheckResults = {};
    for (const question of questions) {
      const answer = normalizeAnswer(answers[question._key] ?? "");
      if (question.questionType === "multipleChoice") {
        const correctOption = question.options?.find((option) => option.isCorrect);
        const correctOptionKey = normalizeAnswer(correctOption?._key ?? "");
        results[question._key] = Boolean(answer && answer === correctOptionKey);
      } else {
        results[question._key] = Boolean(answer && question.acceptedAnswers?.some((acceptedAnswer) => normalizeAnswer(acceptedAnswer) === answer));
      }
    }
    setCheckResults(results);
    return results;
  }

  async function submitHomework(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = studentName.trim();
    if (!cleanName || completedCount !== questions.length) return;

    const results = checkResults ?? checkAnswers();
    const finalScore = Object.values(results).filter(Boolean).length;
    setSubmissionStatus("sending");
    const { error } = await supabase.from("classroom_homework_submissions").insert({
      classroom_item_id: itemId,
      student_name: cleanName,
      answers,
      score: finalScore,
      total_questions: questions.length,
    });

    setSubmissionStatus(error ? "error" : "success");
  }

  function resetExercise() {
    setAnswers({});
    setCheckResults(null);
    setSubmissionStatus("idle");
    try { window.localStorage.removeItem(storageKey); } catch {}
  }

  return (
    <form className="interactive-homework" onSubmit={submitHomework}>
      <div className="interactive-homework-heading">
        <div><p className="classroom-card-meta">{t("eyebrow")}</p><h4>{t("title")}</h4></div>
        <span>{t("progress", { completed: completedCount, total: questions.length })}</span>
      </div>

      <ol className="interactive-question-list">
        {questions.map((question, index) => {
          const result = checkResults?.[question._key];
          return (
            <li className={checkResults ? (result ? "is-correct" : "is-incorrect") : undefined} key={question._key}>
              <div className="interactive-question-number">{String(index + 1).padStart(2, "0")}</div>
              <fieldset>
                <legend>{question.prompt}</legend>
                {question.hint && <p className="interactive-question-hint">{question.hint}</p>}
                {question.questionType === "multipleChoice" ? (
                  <div className="interactive-question-options">
                    {question.options?.map((option) => (
                      <label key={option._key}>
                        <input type="radio" name={`${itemId}-${question._key}`} value={option._key} checked={answers[question._key] === option._key} onChange={(event) => answerQuestion(question._key, event.target.value)} />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <label className="interactive-question-answer">
                    <span>{question.questionType === "fillBlank" ? t("fillBlankLabel") : t("shortAnswerLabel")}</span>
                    <input type="text" maxLength={300} value={answers[question._key] ?? ""} onChange={(event) => answerQuestion(question._key, event.target.value)} autoComplete="off" />
                  </label>
                )}
                {checkResults && <div className="interactive-answer-feedback" aria-live="polite"><strong>{result ? t("correct") : t("tryAgain")}</strong>{question.explanation && <p>{question.explanation}</p>}</div>}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="interactive-homework-actions">
        <button className="button-link" type="button" onClick={checkAnswers} disabled={completedCount === 0}>{t("checkAnswers")}</button>
        <button className="text-link" type="button" onClick={resetExercise}>{t("startAgain")}</button>
      </div>

      {checkResults && <p className="interactive-homework-score" aria-live="polite">{t("score", { score, total: questions.length })}</p>}

      <div className="interactive-homework-submit">
        <label><span>{t("name")}</span><input required maxLength={100} autoComplete="name" value={studentName} onChange={(event) => setStudentName(event.target.value)} /></label>
        <button className="button-link" disabled={completedCount !== questions.length || submissionStatus === "sending"}>{submissionStatus === "sending" ? t("submitting") : t("submit")}</button>
        <p>{t("savedNote")}</p>
        <div aria-live="polite">
          {submissionStatus === "success" && <p className="interactive-submit-success">{t("success")}</p>}
          {submissionStatus === "error" && <p className="interactive-submit-error">{t("error")}</p>}
        </div>
      </div>
    </form>
  );
}
