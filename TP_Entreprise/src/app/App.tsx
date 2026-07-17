import { useState, useEffect } from "react";
import {
  Menu, X, ArrowRight, Star, Wifi, BarChart3, RefreshCw,
  Smartphone, Package, Crown, ChevronRight, Zap, ShieldCheck,
  TrendingUp, Mail, Phone, MapPin, Linkedin, Instagram, Twitter,
  Check, QrCode,
} from "lucide-react";

type Page = "home" | "about" | "services" | "contact";

const NAV = [
  { label: "Accueil",   page: "home"     as Page },
  { label: "À propos",  page: "about"    as Page },
  { label: "Offres",    page: "services" as Page },
  { label: "Contact",   page: "contact"  as Page },
];

/* ──────────────────────────────────────────────
   LOGO NFC + ÉTOILE
────────────────────────────────────────────── */
function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#10B981" strokeWidth="1.5" />
      {/* NFC arc waves */}
      <path d="M13 20 a7 7 0 0 1 7-7"  stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20 a10 10 0 0 1 10-10" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
      <path d="M16 20 a4 4 0 0 1 4-4"  stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      {/* Star */}
      <path
        d="M24 14l1.2 2.5 2.8.4-2 2 .5 2.8L24 20.5l-2.5 1.2.5-2.8-2-2 2.8-.4z"
        fill="#10B981"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   NAVBAR
────────────────────────────────────────────── */
function Navbar({ current, navigate }: { current: Page; navigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : ""
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-2.5">
          <Logo />
          <span className="font-extrabold text-lg text-foreground tracking-tight">
            Touch<span className="text-primary">Link</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
          {NAV.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                current === page
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate("contact")}
            className="ml-4 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-accent transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-px"
          >
            Démarrer
          </button>
        </nav>

        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-5">
          {NAV.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { navigate(page); setOpen(false); }}
              className={`block w-full text-left py-3.5 text-sm font-semibold border-b border-border/40 last:border-0 ${
                current === page ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
────────────────────────────────────────────── */
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="border-t border-border" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <button onClick={() => navigate("home")} className="flex items-center gap-2.5 mb-4">
              <Logo />
              <span className="font-extrabold text-lg text-foreground tracking-tight">
                Touch<span className="text-primary">Link</span>
              </span>
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Le pont invisible entre l'expérience physique et la croissance numérique. Un geste. Plus de clients.
            </p>
          </div>
          <div>
            <p className="text-foreground font-bold text-xs uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {NAV.map(({ label, page }) => (
                <li key={page}>
                  <button onClick={() => navigate(page)} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-foreground font-bold text-xs uppercase tracking-widest mb-4">Contact</p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>contact@touchlink.io</li>
              <li>+241 07 12 34 56</li>
              <li>Libreville, Gabon</li>
            </ul>
            <div className="flex gap-2 mt-5">
              {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TouchLink. Tous droits réservés.</p>
          <div className="flex gap-4">
            {["Confidentialité", "CGU", "Mentions légales"].map((t) => (
              <span key={t} className="hover:text-primary cursor-pointer transition-colors">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   HOME PAGE
────────────────────────────────────────────── */
const PROOF = [
  { value: "+340", label: "avis générés en 30 jours", sub: "Boulangerie Mboukou, Libreville" },
  { value: "4.9★", label: "note moyenne atteinte", sub: "Restaurant Le Vérandah" },
  { value: "×3",   label: "de nouveaux clients/mois", sub: "Salon Éclat d'Or" },
];

const HOW = [
  { icon: Package,     step: "01", title: "Vous recevez votre plaque", desc: "Design épuré, finition mate premium. Posée sur votre comptoir ou à l'entrée en moins de 2 minutes." },
  { icon: Smartphone,  step: "02", title: "Le client approche son téléphone", desc: "Un simple geste NFC — sans app, sans QR code — et il est instantanément redirigé." },
  { icon: Star,        step: "03", title: "Il laisse un avis ★★★★★", desc: "Vers Google, TripAdvisor, Facebook — vous choisissez la destination depuis votre dashboard." },
  { icon: TrendingUp,  step: "04", title: "Votre réputation monte", desc: "Votre classement local s'améliore. Plus de clients vous trouvent. Le cycle se répète." },
];

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── HÉRO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }}
        />
        {/* Glow émeraude */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/8 blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full grid md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Technologie NFC · Réputation automatisée
            </div>

            <h1 className="text-5xl md:text-[3.75rem] font-extrabold text-foreground leading-[1.08] tracking-tight mb-6">
              Un geste.<br />
              <span className="text-primary">Plus de clients.</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
              TouchLink transforme chaque interaction physique en avis Google. Une plaque NFC premium posée sur votre comptoir, et vos clients deviennent vos meilleurs ambassadeurs.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("services")}
                className="flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-accent hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                Voir les offres <ArrowRight size={17} />
              </button>
              <button
                onClick={() => navigate("contact")}
                className="flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:border-primary/30 hover:bg-white/4 transition-all"
              >
                Demander une démo <ChevronRight size={17} />
              </button>
            </div>

            {/* Social proof mini */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {["photo-1560250097-0b93528c311a","photo-1573496359142-b8d87734a5a2","photo-1507003211169-0a1dd7228f2d"].map((id) => (
                  <img key={id} src={`https://images.unsplash.com/photo-${id}?w=48&h=48&fit=crop&auto=format`}
                    alt="" className="w-9 h-9 rounded-full border-2 border-background object-cover" loading="lazy" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">+120 commerçants</span> font confiance à TouchLink
              </p>
            </div>
          </div>

          {/* Carte NFC illustrée */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl scale-110" />
              {/* Carte physique */}
              <div className="relative w-72 h-44 rounded-2xl bg-gradient-to-br from-[#1A1C1E] to-[#111214] border border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-hidden">
                {/* Reflet */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />

                <div className="flex items-start justify-between">
                  <Logo size={38} />
                  <div className="text-right">
                    <p className="text-foreground font-extrabold text-sm tracking-tight">Touch<span className="text-primary">Link</span></p>
                    <p className="text-muted-foreground text-xs mt-0.5">NFC Premium</p>
                  </div>
                </div>

                <div>
                  <p className="text-foreground font-bold text-base">Approchez votre téléphone</p>
                  <div className="flex items-center gap-2 mt-1">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={12} className="text-primary fill-primary" />)}
                    <span className="text-muted-foreground text-xs ml-1">→ Google Avis</span>
                  </div>
                </div>
              </div>

              {/* Notification flottante */}
              <div className="absolute -bottom-5 -right-6 bg-card border border-border rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Star size={15} className="text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-foreground text-xs font-bold">Nouvel avis 5★</p>
                  <p className="text-muted-foreground text-[10px]">il y a 2 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="border-y border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8">
          {PROOF.map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-extrabold text-primary mb-1">{value}</p>
              <p className="text-foreground font-semibold text-sm mb-1">{label}</p>
              <p className="text-muted-foreground text-xs">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Comment ça marche</h2>
          <p className="text-muted-foreground max-w-md mx-auto">De la plaque posée sur votre comptoir à l'avis publié sur Google, en moins de 10 secondes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8">
              <p className="text-6xl font-extrabold text-foreground/5 absolute top-4 right-5 leading-none select-none">{step}</p>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="text-foreground font-bold text-base mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORYTELLING PHOTO ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden grid md:grid-cols-2 min-h-[380px]">
          {/* Image commerce */}
          <div className="relative bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop&auto=format"
              alt="Commerçant heureux grâce aux avis TouchLink"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
          </div>
          {/* Texte */}
          <div className="relative bg-card border border-border flex flex-col justify-center p-10 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              Résultat réel
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">
              "Mon compteur Google est passé de 12 à <span className="text-primary">187 avis</span> en deux mois."
            </h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Ibrahim K., propriétaire de La Saveur du Coin à Libreville, utilise TouchLink Business depuis mars 2025. Sa fiche Google est aujourd'hui la première de son quartier.
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format"
                alt="Ibrahim K." className="w-11 h-11 rounded-full object-cover border-2 border-primary/30" />
              <div>
                <p className="text-foreground font-bold text-sm">Ibrahim K.</p>
                <p className="text-muted-foreground text-xs">La Saveur du Coin · Plan Orsec, Libreville</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/15 to-accent/5 border border-primary/20 p-14 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 60% 50%, rgba(16,185,129,0.08) 0%, transparent 60%)" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Prêt à automatiser votre réputation ?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Rejoignez les commerçants qui génèrent des avis pendant qu'ils travaillent. Sans effort. Sans app.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => navigate("services")} className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-accent transition-all hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5">
                Choisir mon offre <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate("contact")} className="flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:border-primary/30 hover:bg-white/4 transition-all">
                Parler à un expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ABOUT PAGE
────────────────────────────────────────────── */
const TEAM = [
  { name: "Amara Diallo",   role: "CEO & Co-fondateur", bio: "Entrepreneur serial, Amara a lancé TouchLink après avoir vu un commerçant gabonais perdre des clients faute d'avis en ligne. Il pilote la vision et les partenariats stratégiques.", img: "photo-1560250097-0b93528c311a" },
  { name: "Léa Fontaine",   role: "CTO",                bio: "Ingénieure logiciel spécialisée en NFC et IoT. Elle a conçu l'ensemble de la stack technique de TouchLink, du firmware des plaques au dashboard SaaS.", img: "photo-1573496359142-b8d87734a5a2" },
  { name: "Kévin Mboumba",  role: "Directeur Commercial", bio: "12 ans d'expérience en développement B2B sur les marchés africains. Kévin construit le réseau de revendeurs et les partenariats avec les chambres de commerce.", img: "photo-1507003211169-0a1dd7228f2d" },
  { name: "Sofia Andrade",  role: "Directrice Design",  bio: "Designeuse produit passionnée par l'expérience premium. Elle supervise l'identité visuelle, le packaging et l'interface du dashboard.", img: "photo-1580489944761-15a19d654956" },
  { name: "Théo Masson",    role: "Ingénieur Produit",  bio: "Spécialiste en intégrations API (Google, TripAdvisor, Meta). Il assure la fiabilité des redirections et développe les nouvelles fonctionnalités du dashboard.", img: "photo-1519085360753-af0119f7cbe7" },
  { name: "Nalini Patel",   role: "Responsable Succès Client", bio: "Elle accompagne chaque commerçant de l'onboarding à l'optimisation de ses résultats. Son mantra : zéro client sans 10 avis supplémentaires le premier mois.", img: "photo-1594744803329-e58b31de8bf5" },
];

function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Notre histoire
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
          Nous vendons de la<br />
          <span className="text-primary">réputation automatisée.</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          TouchLink est né d'un constat simple : en Afrique comme ailleurs, les meilleurs commerçants perdent des clients parce que leur fiche Google est vide. Pas par manque de qualité — par manque d'un système pour collecter les avis. Nous avons construit ce système. Il tient dans une plaque.
        </p>
      </div>

      {/* Mission / Vision / Valeurs */}
      <div className="grid md:grid-cols-3 gap-5 mb-20">
        {[
          { label: "Mission", body: "Donner à chaque commerçant — d'une boulangerie de Libreville à un hôtel à Douala — les outils de réputation en ligne que seules les grandes enseignes possédaient." },
          { label: "Vision", body: "Devenir le standard de la preuve sociale physique en Afrique francophone d'ici 2028, avec 10 000 plaques actives et 1 million d'avis générés." },
          { label: "Valeurs", body: "Simplicité radicale, résultats mesurables, design premium accessible. Nous ne promettons jamais ce que nos clients ne peuvent pas voir dans leur tableau de bord." },
        ].map(({ label, body }) => (
          <div key={label} className="p-7 rounded-2xl bg-card border border-border">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">{label}</p>
            <p className="text-foreground text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mb-20">
        <h2 className="text-2xl font-extrabold text-foreground mb-8">Nos étapes clés</h2>
        <div className="relative border-l-2 border-border pl-8 space-y-8">
          {[
            { year: "2023", event: "Fondation à Libreville. Premier prototype de plaque NFC testé dans 3 commerces pilotes." },
            { year: "2024 Q1", event: "Lancement de l'offre Starter. 40 plaques vendues en 6 semaines." },
            { year: "2024 Q3", event: "Lancement du Dashboard SaaS. Levée de fonds amorçage de 150 000 €." },
            { year: "2025", event: "+120 clients actifs, expansion au Cameroun et en Côte d'Ivoire. Lancement de l'offre Premium." },
          ].map(({ year, event }) => (
            <div key={year} className="relative">
              <div className="absolute -left-[2.6rem] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">{year}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Équipe */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">L'équipe</h2>
        <p className="text-muted-foreground mb-10">Les talents derrière chaque plaque TouchLink.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map(({ name, role, bio, img }) => (
            <div key={name} className="group rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8 overflow-hidden">
              <div className="overflow-hidden aspect-[4/3] bg-secondary">
                <img
                  src={`https://images.unsplash.com/photo-${img}?w=480&h=360&fit=crop&auto=format`}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-foreground font-bold text-base">{name}</h3>
                <p className="text-primary text-[11px] font-bold uppercase tracking-wider mt-0.5 mb-2">{role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
                <div className="flex gap-2 mt-4">
                  {[Linkedin, Twitter].map((Icon, i) => (
                    <button key={i} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SERVICES / OFFRES PAGE
────────────────────────────────────────────── */
const OFFERS = [
  {
    tier: "Starter",
    icon: Package,
    price: "29 €",
    period: "paiement unique",
    tag: null,
    desc: "La plaque NFC design pour commencer à collecter vos premiers avis. Simple, efficace, immédiat.",
    features: [
      "1 plaque NFC finition mate premium",
      "Lien de redirection fixe",
      "Compatible tous smartphones",
      "Redirection vers Google, Facebook ou TripAdvisor",
      "Support par email",
    ],
    cta: "Commander",
    highlight: false,
  },
  {
    tier: "Business",
    icon: BarChart3,
    price: "19 €",
    period: "/ mois + plaque offerte",
    tag: "Le plus populaire",
    desc: "La plaque NFC + le dashboard SaaS pour piloter votre réputation en temps réel et changer de destination en un clic.",
    features: [
      "Tout le Starter, inclus",
      "Dashboard en temps réel (scans, notes, tendances)",
      "Changement de destination instantané",
      "Redirection A/B (matin Google, soir Instagram…)",
      "Statistiques hebdomadaires par email",
      "Support prioritaire 7j/7",
    ],
    cta: "Démarrer l'essai 14j gratuit",
    highlight: true,
  },
  {
    tier: "Premium",
    icon: Crown,
    price: "49 €",
    period: "/ mois + matériel offert",
    tag: "Suite complète",
    desc: "La solution totale pour les établissements multi-sites et les agences : menus digitaux, Wi-Fi NFC, CRM intégré.",
    features: [
      "Tout le Business, inclus",
      "Plaques illimitées sur un compte",
      "Menus digitaux & Wi-Fi NFC",
      "CRM : historique client, segmentation",
      "API & webhooks",
      "Manager de compte dédié",
      "Packaging personnalisé à votre marque",
    ],
    cta: "Parler à un expert",
    highlight: false,
  },
];

const FEATURES = [
  { icon: RefreshCw,   title: "Redirection en temps réel",  desc: "Changez la destination de votre plaque depuis votre téléphone, sans remplacer l'objet." },
  { icon: ShieldCheck, title: "Avis authentifiés",          desc: "Seuls les vrais clients qui ont approché la plaque physiquement peuvent laisser un avis." },
  { icon: QrCode,      title: "NFC + QR Code",              desc: "Chaque plaque embarque aussi un QR code de secours pour les téléphones plus anciens." },
  { icon: Zap,         title: "Activation en 2 minutes",    desc: "Retirez le film protecteur, posez la plaque, activez dans l'app. Pas de technicien." },
];

function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Architecture de l'offre
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Choisissez votre niveau<br />
          <span className="text-primary">de croissance</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          De la plaque seule à la suite complète, chaque offre est pensée pour générer des résultats mesurables dès le premier mois.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-24 items-start">
        {OFFERS.map(({ tier, icon: Icon, price, period, tag, desc, features, cta, highlight }) => (
          <div
            key={tier}
            className={`relative rounded-2xl border flex flex-col p-8 transition-all duration-300 ${
              highlight
                ? "bg-primary/8 border-primary/40 shadow-2xl shadow-primary/15 scale-[1.02]"
                : "bg-card border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/8"
            }`}
          >
            {tag && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full whitespace-nowrap">
                {tag}
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${highlight ? "bg-primary/20" : "bg-secondary"}`}>
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="text-foreground font-extrabold text-xl mb-1">{tier}</h3>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">{desc}</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-foreground">{price}</span>
              <span className="text-muted-foreground text-sm ml-1">{period}</span>
            </div>
            <ul className="space-y-2.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check size={15} className="text-primary flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("contact")}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                highlight
                  ? "bg-primary text-white hover:bg-accent hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                  : "border border-border text-foreground hover:border-primary/30 hover:bg-white/4"
              }`}
            >
              {cta}
            </button>
          </div>
        ))}
      </div>

      {/* Features techniques */}
      <div className="mb-16">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-10">Ce qui fait la différence</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/25 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="text-foreground font-bold text-sm mb-2">{title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-12 rounded-3xl bg-card border border-border">
        <h2 className="text-2xl font-extrabold text-foreground mb-3">Vous hésitez encore ?</h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">Prenez 20 minutes avec notre équipe. Zéro engagement, 100% de clarté.</p>
        <button onClick={() => navigate("contact")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-accent transition-all hover:shadow-lg hover:shadow-primary/25">
          Réserver une démo gratuite <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   CONTACT PAGE
────────────────────────────────────────────── */
function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", type: "", offer: "", message: "", gdpr: false });
  const [sent, setSent] = useState(false);

  const cls = "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all";

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Contactez-nous
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Parlons de votre<br />
          <span className="text-primary">croissance.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg">Réponse garantie sous 24h ouvrées. Pas de script, pas de vendeur — juste quelqu'un qui connaît votre problème.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Infos */}
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Mail,   label: "Email",     val: "contact@touchlink.io" },
            { icon: Phone,  label: "Téléphone", val: "+241 07 12 34 56" },
            { icon: MapPin, label: "Adresse",   val: "Libreville, Gabon" },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex gap-4 items-start p-5 rounded-2xl bg-card border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-foreground font-semibold text-sm">{val}</p>
              </div>
            </div>
          ))}

          {/* Packaging visual hint */}
          <div className="relative rounded-2xl overflow-hidden bg-secondary border border-border aspect-video">
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=280&fit=crop&auto=format"
              alt="Packaging premium TouchLink"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-end p-4">
              <p className="text-white text-xs font-semibold">Packaging premium — livraison sous 5 jours ouvrés</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-14 rounded-2xl bg-card border border-primary/25">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Check size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-3">Message reçu !</h2>
              <p className="text-muted-foreground max-w-xs text-sm">Notre équipe vous répondra dans les 24 heures ouvrées. En attendant, consultez nos offres.</p>
              <button onClick={() => setSent(false)} className="mt-8 px-6 py-2.5 border border-border text-foreground text-sm font-bold rounded-xl hover:border-primary/30 hover:bg-white/4 transition-all">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="p-8 rounded-2xl bg-card border border-border space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Prénom <span className="text-primary">*</span></label>
                  <input type="text" required placeholder="Jean" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={cls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Nom <span className="text-primary">*</span></label>
                  <input type="text" required placeholder="Dupont" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={cls} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Email <span className="text-primary">*</span></label>
                <input type="email" required placeholder="jean@moicommerce.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={cls} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Téléphone</label>
                  <input type="tel" placeholder="+241 07 …" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={cls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Type d'établissement</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={cls}>
                    <option value="">Choisir…</option>
                    <option>Restaurant / Bar</option>
                    <option>Commerce de détail</option>
                    <option>Hôtel / Hébergement</option>
                    <option>Salon / Beauté</option>
                    <option>Santé / Médical</option>
                    <option>Agence / Revendeur</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Offre qui m'intéresse</label>
                <select value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} className={cls}>
                  <option value="">Pas encore décidé</option>
                  <option>Starter — 29 € unique</option>
                  <option>Business — 19 €/mois</option>
                  <option>Premium — 49 €/mois</option>
                  <option>Je veux une démo d'abord</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Message <span className="text-primary">*</span></label>
                <textarea required rows={4} placeholder="Dites-nous en quelques mots votre situation actuelle (nombre d'avis, objectif…)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${cls} resize-none`} />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={form.gdpr} onChange={(e) => setForm({ ...form, gdpr: e.target.checked })} className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">J'accepte que TouchLink utilise mes informations pour me recontacter. <span className="text-primary">Politique de confidentialité.</span></span>
              </label>

              <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-xl hover:bg-accent hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all">
                Envoyer ma demande <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   APP ROOT
────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar current={page} navigate={navigate} />
      <main>
        {page === "home"     && <HomePage     navigate={navigate} />}
        {page === "about"    && <AboutPage    />}
        {page === "services" && <ServicesPage navigate={navigate} />}
        {page === "contact"  && <ContactPage  />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
