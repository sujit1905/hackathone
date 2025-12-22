// src/pages/Contact.jsx
const Contact = () => {
  return (
    <div className="pb-16">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
          Contact <span className="text-[#fa8c16]">Us</span>
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-slate-600">
          Have a question about events, clubs, or hosting on DNICA EventHub?
          Send a message and the team will get back to you soon.
        </p>
      </section>

      {/* Content */}
      <section className="grid gap-8 md:grid-cols-[1.4fr,1fr]">
        {/* Form */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#fa8c16] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#fa8c16] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Eg. Issue with event registration"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#fa8c16] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#fa8c16] focus:bg-white resize-none"
              />
            </div>

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-black transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Side info */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">
              Support & queries
            </h2>
            <p className="text-sm text-slate-600 mb-2">
              For any platform issues, event approvals, or partnership
              enquiries, reach out using the form or via email.
            </p>
            <p className="text-sm text-slate-700">
              Email:{" "}
              <span className="font-medium">support@dnicaeventhub.com</span>
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 text-slate-50 p-5 space-y-2">
            <h3 className="text-sm font-semibold">For organizers</h3>
            <p className="text-xs text-slate-200">
              Want to list your college fest, hackathon, or competition on
              DNICA EventHub? Click “Host Event” in the navbar or contact the
              team for onboarding help.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
