import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Manifesto — Sovereign",
  description:
    "Why the company as we know it is becoming optional, and what replaces it.",
};

export default function ManifestoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Sovereign
            </span>
          </Link>
          <Link
            href="/#waitlist"
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
          >
            Join Waitlist
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        <div className="mb-12">
          <p className="text-sm text-violet-400 font-mono uppercase tracking-wider mb-4">
            The Manifesto
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.15]">
            The company is becoming optional.
          </h1>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300 leading-relaxed text-[17px]">
          <p>
            For 200 years, the equation for creating economic value was simple:
          </p>

          <p className="text-xl font-semibold text-white text-center py-4">
            Value = Idea &times; Team &times; Capital &times; Time
          </p>

          <p>
            You needed all four. An idea without a team was a daydream. A team
            without capital couldn&apos;t build. Capital without time
            couldn&apos;t ship. So we invented the <strong>company</strong> — a
            container where humans pooled their execution ability because no
            single person could build complex things alone.
          </p>

          <p>
            Companies were a brilliant hack. They gave us the joint-stock
            corporation, limited liability, the industrial revolution, the
            internet economy. Every institution the world runs on — banks,
            governments, insurance, procurement, regulation — was designed
            around this unit of production.
          </p>

          <p>Then, in the space of about three years, three of those variables collapsed.</p>

          <p className="text-xl font-semibold text-white text-center py-4">
            Value = Idea &times; AI
          </p>

          <p>
            <strong>Team?</strong> AI agents now write code, design interfaces,
            handle customer support, generate marketing copy, draft legal
            contracts, manage bookkeeping, and analyze markets. One person
            working with AI produces what a 15-person team produced in 2020.
          </p>

          <p>
            <strong>Capital?</strong> Infrastructure that cost $500K in 2015
            costs $50/month today. Cloud compute is pay-per-use. AI tools are
            free or cheap. The barriers to building just vanished.
          </p>

          <p>
            <strong>Time?</strong> What took six months takes six days. What
            took six days takes six hours. The compression is exponential and
            ongoing.
          </p>

          <hr className="border-zinc-800 my-10" />

          <h2 className="text-2xl font-bold text-white">
            The wall nobody talks about
          </h2>

          <p>
            Everyone celebrates the creation revolution. &quot;Anyone can build!&quot;
            &quot;Ship in a weekend!&quot; &quot;Vibe coding!&quot; And it&apos;s true — the cost of
            <em> making things</em> has collapsed to near zero.
          </p>

          <p>
            But the cost of <em>operating as a business</em> hasn&apos;t changed at
            all:
          </p>

          <ul className="space-y-2">
            <li>
              Legal entity formation: 2 weeks, $2,000, a lawyer
            </li>
            <li>
              Business bank account: requires incorporation, branch visits,
              paperwork
            </li>
            <li>
              Insurance: $5K/year, weeks of quotes, no category for
              &quot;solo AI operator&quot;
            </li>
            <li>
              Contracts: $5K retainer, weeks of back-and-forth with each
              client&apos;s legal team
            </li>
            <li>
              Taxes: $3K/year for a CPA, multi-jurisdiction nightmares
            </li>
            <li>
              Enterprise credibility: &quot;You&apos;re just one person?&quot; — meeting
              over
            </li>
          </ul>

          <p>
            The world is organized around a unit of economic production — the
            company — that is becoming <strong>increasingly unnecessary</strong>{" "}
            for more and more types of value creation. And{" "}
            <strong>nothing is organized around the unit that&apos;s replacing it.</strong>
          </p>

          <hr className="border-zinc-800 my-10" />

          <h2 className="text-2xl font-bold text-white">
            The new unit of production
          </h2>

          <p>
            The new unit is: <strong>one human + AI = full economic entity.</strong>
          </p>

          <p>
            This entity can research a market, build a product, design it,
            market it, sell it, support customers, handle accounting, manage
            legal, and scale to millions of users — without hiring anyone.
          </p>

          <p>But this entity cannot:</p>

          <ul className="space-y-2">
            <li>Get a business bank account easily</li>
            <li>Get liability insurance priced for one person</li>
            <li>
              Pass enterprise procurement (&quot;we only buy from companies with
              50+ employees&quot;)
            </li>
            <li>Access wholesale enterprise pricing on tools</li>
            <li>Get a business credit line</li>
            <li>File taxes optimally across jurisdictions</li>
            <li>
              Get legal protection equivalent to a corporation
            </li>
          </ul>

          <p>
            Every institution in the world has a door labeled
            &quot;COMPANIES ONLY.&quot; And every solo operator is standing outside,
            producing company-level value, unable to walk through.
          </p>

          <hr className="border-zinc-800 my-10" />

          <h2 className="text-2xl font-bold text-white">
            What we&apos;re building
          </h2>

          <p>
            Sovereign is the infrastructure layer for the post-corporate era.
          </p>

          <p>
            You sign up. In 60 seconds, you are a full economic entity. Legal
            structure created. Bank account opened. Payments live. Insurance
            active. Contracts ready. Taxes handled. Trust established.
          </p>

          <p>
            Six AI agents run your back office — bookkeeper, tax agent, legal
            agent, sales agent, support agent, procurement agent. You focus on
            creating value. Everything else is automated.
          </p>

          <p>
            Your Trust Profile — a verified, data-driven record of your revenue,
            delivery track record, client satisfaction, and compliance — replaces
            team size as the signal of credibility. When an enterprise client
            asks &quot;why should we trust you?&quot; — your profile shows more
            data than they&apos;d get from a traditional vendor assessment of a
            500-person company.
          </p>

          <p>
            And as the network grows — 1,000 operators, 10,000, 100,000 — it
            becomes something new. Not a company. Not a marketplace. A
            network of independent operators sharing infrastructure,
            purchasing power, trust, and clients. From the outside, it looks
            like one massive organization. From the inside, every person is
            independent, sovereign, free.
          </p>

          <hr className="border-zinc-800 my-10" />

          <h2 className="text-2xl font-bold text-white">
            The future is independent
          </h2>

          <p>
            There are 1.57 billion freelancers on Earth. Tens of millions more
            are trapped in jobs they&apos;d leave tomorrow if operating
            independently wasn&apos;t so hard. AI just gave them the ability to
            create. We give them the ability to operate.
          </p>

          <p>
            The last time a new class of actor joined the internet economy, it
            was smartphones. That transition created iOS, Android, mobile
            payments, app stores — trillions in market value.
          </p>

          <p>
            AI-augmented solo operators are a bigger shift. And the
            infrastructure layer for this shift hasn&apos;t been built yet.
          </p>

          <p className="text-xl font-semibold text-white">
            We&apos;re building it. Come be sovereign.
          </p>

          <div className="mt-12 text-center">
            <Link
              href="/#waitlist"
              className="inline-block rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
            >
              Join the Waitlist &rarr;
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-zinc-800/30 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-medium text-zinc-400">Sovereign</span>
          </div>
          <p className="text-sm text-zinc-600">
            The operating system for independent operators.
          </p>
          <p className="text-xs text-zinc-700">&copy; 2026</p>
        </div>
      </footer>
    </main>
  );
}
