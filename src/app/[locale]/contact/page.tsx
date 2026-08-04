import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-16">
      <h1 className="text-3xl font-bold">Contact</h1>
      <ContactForm />
    </main>
  );
}