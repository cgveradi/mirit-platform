# Classroom launch runbook

## One-time production setup

### 1. Enable Supabase comments

Open the Supabase SQL Editor for the production project, paste the contents of
`supabase/migrations/20260816000000_classroom_comments.sql`, and run it once.

The migration creates a moderated comments table:

- visitors may submit comments;
- new comments are private by default;
- only approved comments are visible publicly;
- visitors cannot approve, edit, or delete comments.

### 2. Connect the Sanity Studio

Open `https://mirit.org/studio`, choose **Register this studio**, and complete the
registration in Sanity Manage. Invite the teacher to the Sanity project with an
editor role if she does not already have access.

## Teacher workflow

1. Open `https://mirit.org/studio` and sign in.
2. Open **Gambia Classroom**.
3. Choose **Create**.
4. Select **Homework** or **Dictionary or resource**.
5. Keep **Website language** set to English for the English classroom.
6. Add the title, summary, and the relevant instructions, due date, or link.
7. Select **Publish**.
8. Open `https://mirit.org/en/gambia-project/classroom` and confirm the item is visible.

Create a second Russian item only when a Russian translation should appear at
`https://mirit.org/ru/gambia-project/classroom`.

## Comment moderation

1. Open the `classroom_comments` table in Supabase.
2. Read new rows where `approved` is false.
3. Set `approved` to true only for comments that should appear publicly.
4. Delete spam or inappropriate submissions.

The `classroom_item_id` value is `general` for the permanent questions section;
other values identify the homework item where the question was submitted.

## Smoke test before class

1. Publish one temporary homework item in Sanity.
2. Confirm it appears in the English classroom.
3. Submit a clearly labelled test question through the website.
4. Confirm the row appears in Supabase with `approved` set to false.
5. Approve it and refresh the classroom; confirm it appears publicly.
6. Delete the test comment and unpublish or delete the temporary homework item.
