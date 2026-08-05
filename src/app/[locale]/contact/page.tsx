import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="eyebrow contact-reveal">{t("eyebrow")}</p>
        <div className="contact-hero-grid">
          <h1 className="contact-reveal">{t("title")}</h1>
          <div className="contact-intro contact-reveal">
            <p>{t("intro")}</p>
            <span>{t("replyNote")}</span>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-heading">
          <p className="eyebrow">{t("formEyebrow")}</p>
          <p>{t("formIntro")}</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
