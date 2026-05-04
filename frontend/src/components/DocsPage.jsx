import React from "react";
import {
  Database,
  HardDrive,
  Server,
  Box,
  Layers,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "environment", label: "Environment" },
  { id: "key-observation", label: "Key observation" },
  {
    id: "experiments",
    label: "Experiments",
    children: [
      { id: "experiment-1", label: "1 · Full volume migration" },
      { id: "experiment-2", label: "2 · mc mirror backup" },
      { id: "experiment-3", label: "3 · rclone backup" },
    ],
  },
  { id: "root-cause", label: "Root cause analysis" },
  { id: "conclusion", label: "Final conclusion" },
  { id: "answer", label: "Answer to core question" },
  { id: "recommendation", label: "Practical recommendation" },
  { id: "future", label: "Future considerations" },
];

const H2 = ({ id, children }) => (
  <h2
    id={id}
    className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground scroll-mt-28 mt-16 mb-5"
  >
    {children}
    <a href={`#${id}`} className="heading-anchor text-[0.7em]">
      #
    </a>
  </h2>
);

const H3 = ({ id, children }) => (
  <h3
    id={id}
    className="font-display text-xl md:text-2xl font-semibold tracking-tight mt-10 mb-3 scroll-mt-28"
  >
    {children}
    {id ? (
      <a href={`#${id}`} className="heading-anchor text-[0.7em]">
        #
      </a>
    ) : null}
  </h3>
);

const P = ({ children }) => (
  <p className="text-[0.98rem] md:text-[1rem] leading-[1.78] text-foreground/85 mb-4">
    {children}
  </p>
);

const Kbd = ({ children }) => (
  <code className="font-mono text-[0.86em] px-1.5 py-[1px] rounded-md bg-secondary border border-border text-foreground/90">
    {children}
  </code>
);

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" id="top">
      <Navbar />

      {/* HERO */}
      <section className="relative border-b border-border/70 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="absolute inset-0 glow pointer-events-none" />
        <div className="relative max-w-[1380px] mx-auto px-6 md:px-10 pt-16 pb-20">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Engineering notes · v1.0
            </div>
            <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold tracking-[-0.025em] leading-[1.05] mb-6">
              Nextcloud Collectives{" "}
              <span className="text-primary">migration</span>{" "}
              — testing & findings.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A field report on migrating a Nextcloud deployment backed by
              MinIO&nbsp;S3 storage — and the surprising way Collectives break
              when bucket configuration changes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#experiments"
                data-testid="hero-cta-experiments"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Jump to experiments
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#conclusion"
                data-testid="hero-cta-conclusion"
                className="inline-flex items-center gap-2 border border-border bg-card/60 backdrop-blur px-5 py-2.5 rounded-full hover:bg-accent transition-colors text-sm font-medium"
              >
                Read conclusion
              </a>
            </div>

            {/* Stat strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
              {[
                { k: "Experiments", v: "3" },
                { k: "Works", v: "1 setup" },
                { k: "Broken", v: "2 setups" },
                { k: "Verdict", v: "Config-bound" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="bg-card px-5 py-4"
                  data-testid={`stat-${s.k.toLowerCase()}`}
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="font-display text-xl md:text-2xl font-semibold mt-0.5">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-10">
        <Sidebar sections={SECTIONS} />

        <article className="min-w-0 max-w-[820px]">
          {/* OVERVIEW */}
          <H2 id="overview">Overview</H2>
          <P>
            This document outlines migration experiments performed on a
            Nextcloud deployment using S3‑compatible object storage
            (MinIO), with a specific focus on{" "}
            <strong>Nextcloud Collectives</strong> data consistency. The goal
            was to determine a reliable method for migrating data across
            environments while preserving Collectives.
          </P>

          {/* ENVIRONMENT */}
          <H2 id="environment">Environment summary</H2>
          <div className="grid sm:grid-cols-2 gap-3 my-5">
            {[
              { icon: Server, label: "Nextcloud", val: "Docker / Helm" },
              { icon: Database, label: "Database", val: "MariaDB" },
              { icon: HardDrive, label: "Object storage", val: "MinIO (S3)" },
              { icon: Layers, label: "Collectives app", val: "Enabled" },
            ].map(({ icon: Icon, label, val }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                data-testid={`env-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="font-medium">{val}</div>
                </div>
              </div>
            ))}
          </div>
          <P>
            Object storage configuration is stored in{" "}
            <Kbd>config/config.php</Kbd>.
          </P>

          {/* KEY OBSERVATION */}
          <H2 id="key-observation">Key observation</H2>
          <Callout type="warn" title="Collectives are tightly bound to storage config">
            Nextcloud Collectives are tightly bound to object storage
            configuration values — especially <Kbd>bucket</Kbd> and{" "}
            <Kbd>objectPrefix</Kbd>. Changing these values after migration
            results in <strong>broken or missing Collectives</strong>.
          </Callout>

          {/* EXPERIMENTS */}
          <H2 id="experiments">Experiments</H2>
          <P>
            Three different backup/restore strategies were tested. Each section
            records the steps, the exact result, and the takeaway.
          </P>

          {/* EXPERIMENT 1 */}
          <H3 id="experiment-1">Experiment 1 — Full Docker volume migration</H3>
          <div className="rounded-xl border border-border bg-card p-5 my-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Steps
            </div>
            <blockquote className="border-l-2 border-primary/50 pl-4 italic text-foreground/85">
              “I copied the entire Docker volumes (database, Nextcloud app data,
              and MinIO data) and restored them in a new environment.”
            </blockquote>
          </div>
          <ResultRow status="fail" title="Migration did NOT work">
            Nextcloud instance failed to restore correctly. Data inconsistency
            observed.
          </ResultRow>
          <Callout type="danger" title="Conclusion">
            Full volume migration is <strong>not reliable</strong> for this
            setup.
          </Callout>

          {/* EXPERIMENT 2 */}
          <H3 id="experiment-2">
            Experiment 2 — Backup config + DB + bucket (<span className="font-mono">mc mirror</span>)
          </H3>
          <div className="rounded-xl border border-border bg-card p-5 my-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Steps
            </div>
            <blockquote className="border-l-2 border-primary/50 pl-4 italic text-foreground/85">
              “I copied the configs, database, and bucket using the following
              commands:”
            </blockquote>
          </div>

          <CodeBlock
            title="mc — MinIO client"
            code={`mc alias set source http://localhost:9000 minioadmin minioadmin
mc alias set target http://localhost:9002 targetadmin targetpassword

mc mirror source/nextcloud-bucket target/nextcloud-bucket`}
          />

          <P>
            “I then restored the database and reused the same configuration
            values.”
          </P>

          <ResultRow status="partial" title="Instance started · Collectives missing">
            Nextcloud came back up cleanly, but Collectives data was gone.
          </ResultRow>

          <H3>Additional test</H3>
          <P>
            “I copied the S3 bucket from <Kbd>bucket1</Kbd> to{" "}
            <Kbd>bucket2</Kbd> instead of downloading locally, then restored
            everything.”
          </P>

          <div className="grid sm:grid-cols-2 gap-3 my-5">
            <ResultCard status="pass">
              Configuration values remained <strong>identical</strong> →
              Collectives worked.
            </ResultCard>
            <ResultCard status="fail">
              Configuration values <strong>changed</strong> → Collectives broke.
            </ResultCard>
          </div>

          <Callout type="info" title="Conclusion">
            Collectives depend on the <strong>exact</strong> object storage
            configuration. Even if the data is present, changing bucket-related
            config breaks references.
          </Callout>

          {/* EXPERIMENT 3 */}
          <H3 id="experiment-3">
            Experiment 3 — Backup using <span className="font-mono">rclone</span>
          </H3>
          <P>
            “I backed up the config, database, and MinIO bucket using rclone.”
          </P>

          <CodeBlock
            title="rclone — S3 sync"
            code={`rclone sync minio:nextcloud-bucket ./s3_dump \\
  --s3-provider Minio \\
  --s3-endpoint http://localhost:9100 \\
  --s3-access-key-id minioadmin \\
  --s3-secret-access-key minioadmin \\
  --s3-force-path-style`}
          />

          <P>
            “I then restored the data back to MinIO and updated configuration
            values.”
          </P>

          <H3>Result analysis</H3>

          <div className="space-y-4 my-4">
            <CaseBlock
              badge="Case 1"
              status="pass"
              title="Change region only"
              changedLabel="Changed"
            >
              <CodeBlock
                language="php"
                title="config.php"
                code={`'region' => 'new-region'`}
              />
              <div className="flex items-center gap-2 text-sm mt-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-foreground/85">
                  Collectives worked correctly.
                </span>
              </div>
            </CaseBlock>

            <CaseBlock
              badge="Case 2"
              status="fail"
              title="Change bucket name"
              changedLabel="Changed"
            >
              <CodeBlock
                language="php"
                title="config.php"
                code={`'bucket' => 'new-bucket'`}
              />
              <div className="flex items-center gap-2 text-sm mt-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-foreground/85">
                  Collectives broke. Data appeared missing or corrupted.
                </span>
              </div>
            </CaseBlock>
          </div>

          {/* ROOT CAUSE */}
          <H2 id="root-cause">Root cause analysis</H2>
          <P>
            Nextcloud stores file references in the database (
            <Kbd>oc_filecache</Kbd>) that are tightly linked to:
          </P>
          <ul className="space-y-2 my-4 text-foreground/85">
            {[
              "S3 bucket name",
              "S3 object prefix",
              "Object storage configuration in config.php",
            ].map((t) => (
              <li key={t} className="flex gap-3 items-start">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <Callout type="warn" title="Why this matters">
            These values act as <strong>logical identifiers</strong>, not just
            connection settings. Changing them causes a mismatch between the
            database’s file references and the actual stored objects.
          </Callout>

          {/* CONCLUSION */}
          <H2 id="conclusion">Final conclusion</H2>

          <div className="grid md:grid-cols-2 gap-4 my-5">
            <div
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5"
              data-testid="conclusion-works"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="font-semibold">What works</span>
              </div>
              <p className="text-sm text-foreground/85 mb-3">
                Keeping the same configuration values:
              </p>
              <ul className="text-sm space-y-1.5 text-foreground/85">
                <li>
                  • <Kbd>bucket</Kbd>
                </li>
                <li>
                  • <Kbd>objectPrefix</Kbd>
                </li>
                <li>
                  • <Kbd>region</Kbd> &nbsp;
                  <span className="text-muted-foreground text-xs">
                    (sometimes safe)
                  </span>
                </li>
              </ul>
              <p className="text-sm text-foreground/85 mt-4 mb-2">Migrating:</p>
              <ul className="text-sm space-y-1.5 text-foreground/85">
                <li>• Database</li>
                <li>• Config</li>
                <li>• Object storage data</li>
              </ul>
            </div>

            <div
              className="rounded-xl border border-red-500/30 bg-red-500/5 p-5"
              data-testid="conclusion-breaks"
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="font-semibold">What breaks Collectives</span>
              </div>
              <p className="text-sm text-foreground/85 mb-3">Changing:</p>
              <ul className="text-sm space-y-1.5 text-foreground/85">
                <li>
                  ✗ <Kbd>bucket</Kbd> name
                </li>
                <li>
                  ✗ <Kbd>objectPrefix</Kbd>
                </li>
              </ul>
            </div>
          </div>

          {/* ANSWER */}
          <H2 id="answer">Answer to the core question</H2>
          <div
            className="rounded-2xl border border-border bg-card p-6 my-5"
            data-testid="core-answer"
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Question
            </div>
            <p className="font-display text-xl md:text-2xl font-semibold mb-5 text-foreground/90">
              “If I change the bucket name or prefix, will it work?”
            </p>
            <div className="inline-flex items-center gap-3 border border-red-500/40 bg-red-500/10 text-red-500 font-mono uppercase tracking-[0.2em] text-sm rounded-full px-4 py-2">
              <XCircle className="h-4 w-4" /> No.
            </div>
            <ul className="mt-5 space-y-2 text-foreground/85 text-sm">
              <li className="flex gap-3">
                <Box className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                Changing the bucket name or prefix will break Collectives.
              </li>
              <li className="flex gap-3">
                <Box className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                Even if all data is copied correctly, Nextcloud cannot resolve
                file references.
              </li>
            </ul>
          </div>

          {/* RECOMMENDATION */}
          <H2 id="recommendation">Practical recommendation</H2>
          <P>For a successful migration:</P>
          <ol className="space-y-3 my-4 list-none counter-reset-[step]">
            {[
              "Keep object storage configuration identical.",
              "Migrate the database dump, config.php, and S3 bucket data.",
              "Avoid modifying the bucket name or prefix.",
            ].map((t, i) => (
              <li
                key={t}
                className="flex gap-4 items-start p-4 rounded-xl border border-border bg-card"
              >
                <div className="h-7 w-7 rounded-md bg-primary/10 text-primary font-mono font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <span className="text-foreground/85 leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>

          {/* FUTURE */}
          <H2 id="future">Future considerations</H2>
          <P>To safely change object storage settings, one would need:</P>
          <Callout type="info">
            A data migration / rewrite process that updates both the database
            references (<Kbd>oc_filecache</Kbd>) and the object storage paths.
            <strong className="block mt-2 text-foreground">
              This is not supported natively by Nextcloud.
            </strong>
          </Callout>

          <footer className="mt-20 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <span>
              © Nextcloud Collectives Migration Report · Engineering field notes
            </span>
            <a
              href="#top"
              className="hover:text-foreground transition-colors"
              data-testid="footer-back-to-top"
            >
              Back to top ↑
            </a>
          </footer>
        </article>
      </div>
    </div>
  );
}

/* ---------- Small presentational subcomponents ---------- */

function ResultRow({ status, title, children }) {
  const map = {
    pass: {
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/5 border-emerald-500/25",
    },
    fail: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/5 border-red-500/25",
    },
    partial: {
      icon: XCircle,
      color: "text-amber-500",
      bg: "bg-amber-500/5 border-amber-500/25",
    },
  };
  const { icon: Icon, color, bg } = map[status];
  return (
    <div
      className={`rounded-xl border ${bg} p-4 my-4 flex gap-3`}
      data-testid={`result-${status}`}
    >
      <Icon className={`h-5 w-5 ${color} mt-0.5 shrink-0`} />
      <div>
        <div className="font-semibold mb-0.5">{title}</div>
        <div className="text-sm text-foreground/85">{children}</div>
      </div>
    </div>
  );
}

function ResultCard({ status, children }) {
  const isPass = status === "pass";
  const Icon = isPass ? CheckCircle2 : XCircle;
  return (
    <div
      className={`rounded-xl border p-4 flex gap-3 items-start ${
        isPass
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-red-500/30 bg-red-500/5"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 mt-0.5 ${
          isPass ? "text-emerald-500" : "text-red-500"
        }`}
      />
      <div className="text-sm text-foreground/85 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function CaseBlock({ badge, title, status, children }) {
  const isPass = status === "pass";
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] bg-secondary text-foreground/75 rounded-full px-2.5 py-1 border border-border">
          {badge}
        </span>
        <span
          className={`text-[10px] font-mono uppercase tracking-[0.2em] rounded-full px-2.5 py-1 border ${
            isPass
              ? "border-emerald-500/40 text-emerald-500 bg-emerald-500/10"
              : "border-red-500/40 text-red-500 bg-red-500/10"
          }`}
        >
          {isPass ? "Works" : "Breaks"}
        </span>
        <span className="font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}
