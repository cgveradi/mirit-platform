"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

type ClassroomComment = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  parent_comment_id: number | null;
};

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
    const { error } = await supabase.from("classroom_comments").insert({
      classroom_item_id: itemId,
      name: cleanName,
      comment: cleanComment,
    });
    if (error) { setStatus("error"); return; }
    setName(""); setComment(""); setStatus("success");
  }

  async function submitReply(event: React.FormEvent, parentCommentId: number) {
    event.preventDefault();
    const cleanName = replyName.trim();
    const cleanComment = replyComment.trim();
    if (!cleanName || !cleanComment) return;

    setReplyStatus("sending");
    const { error } = await supabase.from("classroom_comments").insert({
      classroom_item_id: itemId,
      parent_comment_id: parentCommentId,
      name: cleanName,
      comment: cleanComment,
    });
    if (error) { setReplyStatus("error"); return; }
    setReplyName(""); setReplyComment(""); setReplyStatus("success");
  }

  const rootComments = approvedComments.filter((approvedComment) => approvedComment.parent_comment_id === null);

  return (
    <div className="classroom-comments">
      {commentsStatus === "ready" && rootComments.length > 0 && (
        <div className="classroom-comment-list" aria-label={t("approvedTitle")}>
          <h4>{t("approvedTitle")}</h4>
          {rootComments.map((approvedComment) => (
            <article key={approvedComment.id}>
              <div>
                <strong>{approvedComment.name}</strong>
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
                <article className="classroom-comment-reply" key={reply.id}>
                  <div>
                    <strong>{reply.name}</strong>
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
