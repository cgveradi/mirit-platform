"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

export default function ClassroomComments({ itemId }: { itemId: string }) {
  const t = useTranslations("classroom.comments");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("classroom_comments").insert({ classroom_item_id: itemId, name, comment });
    if (error) { setStatus("error"); return; }
    setName(""); setComment(""); setStatus("success");
  }

  return <details className="classroom-comments">
    <summary>{t("title")}</summary>
    <form onSubmit={submit}>
      <label><span>{t("name")}</span><input required value={name} onChange={(event) => setName(event.target.value)} /></label>
      <label><span>{t("comment")}</span><textarea required rows={3} value={comment} onChange={(event) => setComment(event.target.value)} /></label>
      <button className="button-link" disabled={status === "sending"}>{status === "sending" ? t("sending") : t("submit")}</button>
      <div aria-live="polite">{status === "success" && <p>{t("success")}</p>}{status === "error" && <p>{t("error")}</p>}</div>
    </form>
  </details>;
}
