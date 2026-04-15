"use client";

import { useState, useEffect, useRef } from "react";

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ─── NavBar with Mobile Menu ─────────────────────────────────────────────────
function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Sovereign</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="/manifesto" className="hover:text-white transition-colors">Manifesto</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#waitlist" className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors">
            Join Waitlist
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-zinc-400 hover:text-white" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {[["#how", "How it works"], ["#features", "Features"], ["#pricing", "Pricing"], ["/manifesto", "Manifesto"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block text-sm text-zinc-400 hover:text-white py-1">{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  const [waitlistCount, setWaitlistCount] = useState(0);
  useEffect(() => {
    fetch("/api/waitlist").then(r => r.json()).then(d => setWaitlistCount(d.total)).catch(() => {});
  }, []);

  return (
    <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-6 overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] glow-orb pointer-events-none" />
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400 mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {waitlistCount > 0 ? `${waitlistCount} operators on the waitlist` : "Building the future of independent work"}
        </div>

        <h1 className="animate-fade-in-up-delay-1 text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
          You build it.<br />
          <span className="gradient-text">We run it.</span>
        </h1>

        <p className="animate-fade-in-up-delay-2 mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Building is easy now. Running a business is still hell &mdash;
          entity formation, banking, contracts, taxes, insurance.
          Sovereign handles all of it for $49/mo so you can focus on the work.
        </p>

        <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#waitlist" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors w-full sm:w-auto">
            Join the Waitlist &rarr;
          </a>
          <a href="#how" className="rounded-full border border-zinc-700 px-8 py-3.5 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors w-full sm:w-auto">
            See How It Works
          </a>
        </div>

        <p className="animate-fade-in-up-delay-4 mt-6 text-sm text-zinc-600">
          For freelancers, indie hackers, AI-augmented consultants, and solo founders.{" "}
          <a href="/manifesto" className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors">Read the manifesto</a>
        </p>
      </div>
    </section>
  );
}

// ─── Why Now Stats ───────────────────────────────────────────────────────────
function WhyNowSection() {
  const stats = [
    { value: "1.57B", label: "freelancers worldwide" },
    { value: "73M", label: "in the US alone" },
    { value: "36%", label: "of US workforce is independent" },
    { value: "$15K+", label: "annual overhead to operate as a business" },
  ];
  return (
    <section className="py-16 px-6 border-t border-zinc-800/30 bg-zinc-950/50">
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up-delay-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl sm:text-4xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section Wrapper with Scroll Animation ───────────────────────────────────
function AnimatedSection({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
}

// ─── Problem Section ─────────────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    { icon: "\u{1F4CB}", title: "Entity Formation", pain: "2 weeks + $2,000 to set up an LLC. Operating agreements, registered agents, tax IDs.", fix: "60 seconds. Optimal entity for your jurisdiction, auto-filed." },
    { icon: "\u{1F3E6}", title: "Banking & Payments", pain: "Business bank account requires incorporation. Payment processing needs verification.", fix: "Instant bank account. Accept payments in any currency from day 1." },
    { icon: "\u{1F4DC}", title: "Contracts & Legal", pain: "$5K retainer for a lawyer. Weeks of back-and-forth on MSAs and NDAs.", fix: "AI-generated contracts in 10 seconds. Customized to your business." },
    { icon: "\u{1F9FE}", title: "Taxes & Accounting", pain: "$3K/year for a CPA. Hours of bookkeeping. Multi-state compliance nightmares.", fix: "Auto-categorized transactions. Real-time tax estimates. Quarterly filing handled." },
    { icon: "\u{1F6E1}\uFE0F", title: "Insurance & Liability", pain: "$5K/year for E&O insurance. Quotes take weeks. No coverage for solo AI operators.", fix: "Instant coverage. Pooled across the network. Fraction of the cost." },
    { icon: "\u{1F91D}", title: "Enterprise Credibility", pain: '"You\'re just one person?" \u2014 Enterprise clients won\'t buy from solo operators.', fix: "Verified trust profile. More transparent than a 500-person company." },
  ];

  return (
    <AnimatedSection id="how" className="py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            You signed up to build.<br />
            <span className="text-zinc-500">Not to do paperwork.</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Every solo operator hits the same wall. The work is easy &mdash; the operations eat you alive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p) => (
            <div key={p.title} className="card-hover rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6">
              <div className="text-2xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-red-400/80 mb-3 line-through decoration-red-500/30">{p.pain}</p>
              <p className="text-sm text-emerald-400/90">{p.fix}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Features Section ────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <AnimatedSection id="features" className="py-20 sm:py-28 px-6 border-t border-zinc-800/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What you actually need to run a business.<br />
            <span className="text-zinc-500">Without hiring anyone.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* AI Agents */}
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 sm:p-8">
            <div className="text-xs font-mono text-violet-400 mb-4 uppercase tracking-wider">AI Operations Team</div>
            <h3 className="text-xl font-semibold mb-4">What you actually need, handled</h3>
            <div className="space-y-3">
              {([
                ["Get paid", "Invoicing, payment collection, multi-currency. Never chase a payment again."],
                ["Stay compliant", "Entity formation, tax filing, insurance. Automated across jurisdictions."],
                ["Close deals", "AI-generated contracts — MSAs, NDAs, SOWs. Customized in seconds."],
                ["Look legitimate", "Trust profile, verified revenue, delivery track record. Enterprise-ready."],
                ["Save on tools", "Network-wide vendor pricing. Solo rates → enterprise rates."],
                ["Focus on work", "Everything else runs in the background. Zero admin time."],
              ] as const).map(([name, desc]) => (
                <div key={name} className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <div><span className="text-sm font-medium">{name}</span><span className="text-sm text-zinc-500"> &mdash; {desc}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Profile */}
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 sm:p-8">
            <div className="text-xs font-mono text-violet-400 mb-4 uppercase tracking-wider">Trust Profile</div>
            <h3 className="text-xl font-semibold mb-4">Your track record replaces your team size</h3>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 font-mono text-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400">sovereign.dev/</span>
                <span className="text-white font-semibold">operator-name</span>
              </div>
              <div className="space-y-2 text-xs">
                {([
                  ["Revenue Verified", "$10K-50K/mo \u2713", true],
                  ["Projects Delivered", "47", false],
                  ["On-Time Rate", "96%", true],
                  ["Client Satisfaction", "4.8 / 5.0", false],
                  ["Insurance", "$1M E&O \u2713", true],
                  ["Compliance", "SOC2-eq \u00B7 GDPR \u2713", true],
                ] as const).map(([label, value, isGreen]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-zinc-500">{label}</span>
                    <span className={isGreen ? "text-emerald-400" : "text-white"}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-4">More transparent than a Fortune 500 vendor assessment. Based on real performance data, not self-reported claims.</p>
          </div>

          {/* Financial Stack */}
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 sm:p-8">
            <div className="text-xs font-mono text-violet-400 mb-4 uppercase tracking-wider">Financial Infrastructure</div>
            <h3 className="text-xl font-semibold mb-4">From entity to first invoice: 60 seconds</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Automated incorporation in any jurisdiction. Business bank account opened instantly. Multi-currency payment processing live from day one. AI generates invoices, tracks payments, sends reminders, estimates taxes, and files quarterly &mdash; you never touch a spreadsheet.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Stripe", "Mercury", "Razorpay", "Wise", "UPI", "SEPA", "ACH"].map((t) => (
                <span key={t} className="text-xs rounded-full border border-zinc-800 px-3 py-1 text-zinc-500">{t}</span>
              ))}
            </div>
          </div>

          {/* Network Effects */}
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 sm:p-8">
            <div className="text-xs font-mono text-violet-400 mb-4 uppercase tracking-wider">Network Power</div>
            <h3 className="text-xl font-semibold mb-4">Independent, but never alone</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              100,000 independent operators sharing infrastructure means purchasing power no solo operator could have alone.
            </p>
            <div className="space-y-3 text-sm">
              {["Collective vendor negotiation (save 60-80% on tools)", "Cross-referral marketplace (operators refer work to each other)", "Pooled insurance (network-wide risk = lower premiums)", "Shared brand trust (enterprise clients buy from the network)"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-violet-400 mt-0.5">&rarr;</span>
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Comparison ──────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    ["Legal entity", "2 weeks, $2K", "60 seconds, included"],
    ["Bank account", "3-5 days, branch visit", "Instant, online"],
    ["Insurance", "$5K/yr, weeks to quote", "Instant, pooled pricing"],
    ["Contracts", "$5K lawyer retainer", "AI-generated in seconds"],
    ["Bookkeeping", "$3K/yr CPA", "AI, continuous, free"],
    ["Tax filing", "$1K-3K/yr", "Automated, included"],
    ["Enterprise credibility", "Hire 50 people", "Trust profile"],
    ["Vendor discounts", "None (too small)", "Network-wide rates"],
    ["Total annual overhead", "$15K - $30K+", "$49/mo"],
  ];

  return (
    <AnimatedSection className="py-20 sm:py-28 px-6 border-t border-zinc-800/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The old way vs. Sovereign</h2>
        </div>
        {/* Desktop table */}
        <div className="hidden sm:block rounded-2xl border border-zinc-800/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
                <th className="text-left p-4 font-medium text-zinc-400">What you need</th>
                <th className="text-left p-4 font-medium text-red-400/70">Traditional</th>
                <th className="text-left p-4 font-medium text-emerald-400">Sovereign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {rows.map(([need, old, sov]) => (
                <tr key={need} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="p-4 font-medium">{need}</td>
                  <td className="p-4 text-zinc-500">{old}</td>
                  <td className="p-4 text-emerald-400">{sov}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {rows.map(([need, old, sov]) => (
            <div key={need} className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-4">
              <div className="font-medium text-sm mb-2">{need}</div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 line-through">{old}</span>
                <span className="text-emerald-400">{sov}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="py-20 sm:py-28 px-6 border-t border-zinc-800/30">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Simple, honest pricing</h2>
        <p className="text-zinc-400 mb-12 max-w-lg mx-auto">We make money when you make money. No hidden fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="card-hover rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 sm:p-8 text-left">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Starter</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-zinc-500 text-sm">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">+ 1% of revenue processed</p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {["Legal entity formation", "Business bank account", "Payment processing (all currencies)", "AI bookkeeping & tax estimates", "AI contract generation", "Basic trust profile", "Community support"].map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-emerald-500">{"\u2713"}</span> {f}</li>
              ))}
            </ul>
          </div>

          <div className="card-hover rounded-2xl border border-violet-600/30 bg-zinc-900/40 p-6 sm:p-8 text-left relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-medium">Most Popular</div>
            <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">Professional</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">$149</span>
              <span className="text-zinc-500 text-sm">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">+ 1% of revenue processed</p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {["Everything in Starter", "E&O + cyber liability insurance", "6 AI operations agents", "Full trust profile + verification", "Enterprise client matching", "Collective vendor pricing", "Multi-jurisdiction support", "Priority support"].map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-violet-400">{"\u2713"}</span> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    { q: "Is this real? Can I use it today?", a: "We're building Sovereign right now. Join the waitlist to get early access in Q3 2026. Founding members will shape the product and lock in lifetime pricing." },
    { q: "How is this different from Stripe Atlas?", a: "Stripe Atlas creates a Delaware C-Corp and stops there. Sovereign is the full operating layer — entity formation, banking, insurance, contracts, bookkeeping, taxes, trust profile, and six AI agents running your back office. In any jurisdiction, not just Delaware." },
    { q: "I'm making good money as a freelancer. Why do I need this?", a: "You're probably spending 30-50% of your time on operational overhead — invoicing, taxes, contracts, chasing payments. Sovereign automates all of it so you can focus on creating value. Plus, the Trust Profile and network effects give you enterprise credibility you can't get alone." },
    { q: "What's the Trust Profile?", a: "A verified, data-driven page showing your revenue range, delivery track record, client satisfaction, insurance coverage, and compliance. When enterprise clients ask \"why should we trust a one-person company?\" — your Trust Profile gives them more data than a traditional vendor assessment of a 500-person company." },
    { q: "How do the AI agents work?", a: "Each agent handles a specific function — bookkeeping, taxes, legal, sales, support, procurement. They run continuously on your data, take action autonomously (like categorizing transactions or sending invoice reminders), and escalate to you only when human judgment is needed." },
    { q: "What does \"network power\" mean?", a: "As operators join Sovereign, the network negotiates collectively with vendors (saving 60-80% on tools), pools insurance risk (lowering premiums), and builds shared brand trust that enterprise clients recognize. You're independent but you benefit from the scale of 100,000 operators." },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-20 sm:py-28 px-6 border-t border-zinc-800/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-900/40 transition-colors"
              >
                <span className="text-sm font-medium pr-8">{faq.q}</span>
                <span className="text-zinc-500 shrink-0 text-lg">{openIdx === i ? "\u2212" : "+"}</span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Waitlist ────────────────────────────────────────────────────────────────
function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [refSource, setRefSource] = useState("landing");

  // Capture referral source from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setRefSource(`referral:${ref}`);
  }, []);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}?ref=${encodeURIComponent(email.split("@")[0] || "friend")}`
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: refSource }),
      });
      const data = await res.json();
      if (res.ok) { setSubmitted(true); setPosition(data.position); }
      else setError(data.error || "Something went wrong");
    } catch { setError("Network error. Try again."); }
    finally { setLoading(false); }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="waitlist" className="py-20 sm:py-28 px-6 border-t border-zinc-800/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-2xl text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Stop doing paperwork. Start doing work.</h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
          Join the waitlist. We&apos;ll handle entity, banking, contracts, taxes, insurance and trust &mdash; so you don&apos;t have to.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <div className="text-emerald-400 text-lg font-semibold mb-3">You&apos;re in. #{position} on the list.</div>
            <p className="text-zinc-400 text-sm mb-6">We&apos;ll send you a welcome email shortly. Founding members get early access + lifetime pricing.</p>
            
            <div className="border-t border-emerald-500/10 pt-6">
              <p className="text-sm text-zinc-300 font-medium mb-3">Share with another operator &mdash; grow the network:</p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400 font-mono outline-none"
                />
                <button
                  onClick={copyLink}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-colors shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just joined the @SovereignOSdev waitlist — the operating system for independent operators. One person. Full company. Zero overhead.\n\n")}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-violet-400 transition-colors"
                >
                  Share on X &rarr;
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-violet-400 transition-colors"
                >
                  Share on LinkedIn &rarr;
                </a>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border border-zinc-700 bg-zinc-900/50 px-5 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet-500 transition-colors" />
            <button type="submit" disabled={loading}
              className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-600">
          <span>No credit card required</span>
          <span>&middot;</span>
          <span>Early access Q3 2026</span>
          <span>&middot;</span>
          <span>Founding member pricing locked forever</span>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-zinc-800/30 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-medium text-zinc-400">Sovereign</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-600">
            <a href="/manifesto" className="hover:text-zinc-400 transition-colors">Manifesto</a>
            <a href="https://github.com/Ask-812/sovereign" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">GitHub</a>
            <a href="https://x.com/SovereignOSdev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">Twitter</a>
          </div>
          <p className="text-xs text-zinc-700">&copy; 2026 Sovereign</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <WhyNowSection />
      <ProblemSection />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
