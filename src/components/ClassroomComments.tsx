"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

type ClassroomComment = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  parent_comment_id: number | null;
};

const studentAvatarIndices = [0, 2, 3, 4, 5, 6, 7];

function conversationNameKey(name: string) {
  const normalizedName = name.trim().toLocaleLowerCase();
  return normalizedName === "рита" || normalizedName === "rita" ? "__teacher__" : normalizedName;
}

function isTeacherName(name: string) {
  return conversationNameKey(name) === "__teacher__";
}

function nameHash(name: string) {
  return Array.from(name).reduce((hash, character) => ((hash * 31) + (character.codePointAt(0) ?? 0)) >>> 0, 0);
}

function buildAvatarAssignments(comments: ClassroomComment[]) {
  const nameOrder: string[] = [];
  const neighbors = new Map<string, Set<string>>();
  let previousName: string | null = null;

  for (const comment of comments) {
    const currentName = conversationNameKey(comment.name);
    if (!neighbors.has(currentName)) { neighbors.set(currentName, new Set()); nameOrder.push(currentName); }
    if (previousName && previousName !== currentName) {
      neighbors.get(currentName)?.add(previousName);
      neighbors.get(previousName)?.add(currentName);
    }
    previousName = currentName;
  }

  const assignments = new Map<string, number>([["__teacher__", 1]]);
  for (const name of nameOrder) {
    if (name === "__teacher__") continue;
    const unavailable = new Set(Array.from(neighbors.get(name) ?? []).map((neighbor) => assignments.get(neighbor)).filter((avatar): avatar is number => avatar !== undefined));
    const start = nameHash(name) % studentAvatarIndices.length;
    const avatar = Array.from({ length: studentAvatarIndices.length }, (_, offset) => studentAvatarIndices[(start + offset) % studentAvatarIndices.length]).find((candidate) => !unavailable.has(candidate));
    assignments.set(name, avatar ?? studentAvatarIndices[start]);
  }
  return assignments;
}

function avatarClassName(name: string, assignments: Map<string, number>) {
  const avatarIndex = assignments.get(conversationNameKey(name)) ?? studentAvatarIndices[0];
  return `classroom-comment-avatar classroom-comment-avatar-${avatarIndex}`;
}

export default function ClassroomComments({ itemId }: { itemId: string }) {
  const t = useTranslations("classroom.comments");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyStatus, setReplyStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [approvedComments, setApprovedComments] = useState<ClassroomComment[]>([]);
  const [commentsStatus, setCommentsStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let isCurrent = true;

    async function loadComments() {
      const { data, error } = await supabase
        .from("classroom_comments")
        .select("id, name, comment, created_at, parent_comment_id")
        .eq("classroom_item_id", itemId)
        .order("created_at", { ascending: true });

      if (!isCurrent) return;
      if (error) {
        setCommentsStatus("error");
        return;
      }

      setApprovedComments((data ?? []) as ClassroomComment[]);
      setCommentsStatus("ready");
    }

    void loadComments();
    return () => { isCurrent = false; };
  }, [itemId]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanComment = comment.trim();
    if (!cleanName || !cleanComment) return;

    setStatus("sending");
    const { data, error } = await supabase
      .from("classroom_comments")
      .insert({ classroom_item_id: itemId, name: cleanName, comment: cleanComment })
      .select("id, name, comment, created_at, parent_comment_id")
      .single();
    if (error) { setStatus("error"); return; }
    setApprovedComments((current) => [...current, data as ClassroomComment]);
    setName(""); setComment(""); setStatus("success");
  }

  async function submitReply(event: React.FormEvent, parentCommentId: number) {
    event.preventDefault();
    const cleanName = replyName.trim();
    const cleanComment = replyComment.trim();
    if (!cleanName || !cleanComment) return;

    setReplyStatus("sending");
    const { data, error } = await supabase
      .from("classroom_comments")
      .insert({ classroom_item_id: itemId, parent_comment_id: parentCommentId, name: cleanName, comment: cleanComment })
      .select("id, name, comment, created_at, parent_comment_id")
      .single();
    if (error) { setReplyStatus("error"); return; }
    setApprovedComments((current) => [...current, data as ClassroomComment]);
    setReplyName(""); setReplyComment(""); setReplyStatus("success");
  }

  const rootComments = useMemo(() => approvedComments.filter((approvedComment) => approvedComment.parent_comment_id === null), [approvedComments]);
  const orderedConversationComments = useMemo(() => rootComments.flatMap((rootComment) => [rootComment, ...approvedComments.filter((reply) => reply.parent_comment_id === rootComment.id)]), [approvedComments, rootComments]);
  const avatarAssignments = useMemo(() => buildAvatarAssignments(orderedConversationComments), [orderedConversationComments]);
  const alternateComments = useMemo(() => {
    const assignments = new Set<number>();
    let previousName: string | null = null;
    let alternate = false;
    for (const currentComment of orderedConversationComments) {
      const currentName = conversationNameKey(currentComment.name);
      if (previousName !== null && currentName !== previousName) alternate = !alternate;
      if (alternate) assignments.add(currentComment.id);
      previousName = currentName;
    }
    return assignments;
  }, [orderedConversationComments]);

  function commentClassName(currentComment: ClassroomComment, baseClass?: string) {
    return [baseClass, alternateComments.has(currentComment.id) && "is-alternate-comment", isTeacherName(currentComment.name) && "is-teacher-comment"].filter(Boolean).join(" ") || undefined;
  }

  return (
    <div className="classroom-comments">
      {commentsStatus === "ready" && rootComments.length > 0 && (
        <div className="classroom-comment-list" aria-label={t("approvedTitle")}>
          <h4>{t("approvedTitle")}</h4>
          {rootComments.map((approvedComment) => (
            <article className={commentClassName(approvedComment)} key={approvedComment.id}>
              <div>
                <span className={avatarClassName(approvedComment.name, avatarAssignments)} aria-hidden="true" />
                <strong>{approvedComment.name}{isTeacherName(approvedComment.name) && <span className="classroom-teacher-badge">{t("teacher")}</span>}</strong>
                <time dateTime={approvedComment.created_at}>
                  {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(approvedComment.created_at))}
                </time>
              </div>
              <p>{approvedComment.comment}</p>
              <button
                className="text-link classroom-comment-reply-button"
                type="button"
                onClick={() => {
                  setReplyingTo((current) => current === approvedComment.id ? null : approvedComment.id);
                  setReplyStatus("idle");
                }}
              >
                {replyingTo === approvedComment.id ? t("cancelReply") : t("reply")}
              </button>
              {approvedComments.filter((reply) => reply.parent_comment_id === approvedComment.id).map((reply) => (
                <article className={commentClassName(reply, "classroom-comment-reply")} key={reply.id}>
                  <div>
                    <span className={avatarClassName(reply.name, avatarAssignments)} aria-hidden="true" />
                    <strong>{reply.name}{isTeacherName(reply.name) && <span className="classroom-teacher-badge">{t("teacher")}</span>}</strong>
                    <time dateTime={reply.created_at}>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(reply.created_at))}</time>
                  </div>
                  <p>{reply.comment}</p>
                </article>
              ))}
              {replyingTo === approvedComment.id && (
                <form className="classroom-comment-reply-form" onSubmit={(event) => submitReply(event, approvedComment.id)}>
                  <p>{t("replyingTo", { name: approvedComment.name })}</p>
                  <label><span>{t("name")}</span><input required maxLength={100} autoComplete="name" value={replyName} onChange={(event) => setReplyName(event.target.value)} /></label>
                  <label><span>{t("replyComment")}</span><textarea required maxLength={2000} rows={3} value={replyComment} onChange={(event) => setReplyComment(event.target.value)} /></label>
                  <p className="classroom-comment-note">{t("moderationNote")}</p>
                  <button className="button-link" disabled={replyStatus === "sending"}>{replyStatus === "sending" ? t("sending") : t("sendReply")}</button>
                  <div aria-live="polite">
                    {replyStatus === "success" && <p>{t("replySuccess")}</p>}
                    {replyStatus === "error" && <p>{t("replyError")}</p>}
                  </div>
                </form>
              )}
            </article>
          ))}
        </div>
      )}
      {commentsStatus === "error" && <p className="classroom-comment-load-error">{t("loadError")}</p>}

      <details>
        <summary>{t("title")}</summary>
        <form onSubmit={submit}>
          <label>
            <span>{t("name")}</span>
            <input required maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            <span>{t("comment")}</span>
            <textarea required maxLength={2000} rows={3} value={comment} onChange={(event) => setComment(event.target.value)} />
          </label>
          <p className="classroom-comment-note">{t("moderationNote")}</p>
          <button className="button-link" disabled={status === "sending"}>
            {status === "sending" ? t("sending") : t("submit")}
          </button>
          <div aria-live="polite">
            {status === "success" && <p>{t("success")}</p>}
            {status === "error" && <p>{t("error")}</p>}
          </div>
        </form>
      </details>
    </div>
  );
}
