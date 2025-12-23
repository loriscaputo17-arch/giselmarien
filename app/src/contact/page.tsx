// src/app/contact/page.tsx
export default function Contact() {
  return (
    <section className="max-w-xl mx-auto px-6 pt-32 pb-20">
      <h2 className="text-3xl font-light mb-8">Propose a Project</h2>

      <form className="space-y-6">
        <input
          type="text"
          placeholder="Name / Organization"
          className="w-full bg-transparent border-b border-neutral-600 py-2 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-neutral-600 py-2 focus:outline-none"
        />
        <textarea
          placeholder="Project description"
          className="w-full bg-transparent border-b border-neutral-600 py-2 focus:outline-none"
        />

        <button className="mt-6 border border-neutral-200 px-8 py-3 uppercase text-xs tracking-widest hover:bg-neutral-100 hover:text-neutral-900 transition">
          Send Request
        </button>
      </form>
    </section>
  );
}
