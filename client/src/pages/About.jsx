// src/pages/About.jsx
const About = () => {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
          About <span className="text-[#fa8c16]">DNICA</span> EventHub
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-slate-600">
          DNICA EventHub is a modern platform that helps students discover,
          track, and participate in the best college events, competitions,
          hackathons, and club activities in one place.
        </p>
      </section>

      {/* Two-column section */}
      <section className="grid gap-8 md:grid-cols-2 mb-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Why this platform exists
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Finding relevant events across colleges is often messy and spread
            across WhatsApp groups, Instagram posts, and random links. DNICA
            EventHub brings everything together so students never miss an
            opportunity and organizers get quality participants.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Central place for college fests, quizzes, and hackathons</li>
            <li>• Clean event cards with dates, mode, fees, and participants</li>
            <li>• Clubs and organizations get a public profile for all events</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            What you can do
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>
              <span className="font-medium text-slate-900">
                Explore curated events:
              </span>{" "}
              Browse featured and all events with smart filters.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Follow clubs & organizations:
              </span>{" "}
              Discover technical clubs, cultural groups, and communities.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Track your journey:
              </span>{" "}
              View your registrations and participations in one dashboard.
            </li>
          </ul>
        </div>
      </section>

      {/* Stats / highlights */}
      <section className="grid gap-4 sm:grid-cols-3 max-w-3xl">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-4 py-5 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Focus
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            College events & opportunities
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-4 py-5 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Experience
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Smooth, clutter‑free discovery
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-4 py-5 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Vision
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            One home for every student event
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
