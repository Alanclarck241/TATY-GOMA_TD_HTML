import { useState, useEffect } from "react";
import { Search, Menu, X, ChevronRight, Clock, TrendingUp, ArrowUpRight, Wifi } from "lucide-react";


const CATEGORIES = ["Politique", "Économie", "Sport", "Culture"] as const;
type Category = (typeof CATEGORIES)[number];

const BREAKING = [
  "Le général Brice Oligui Nguema annonce la date du référendum constitutionnel pour le 16 novembre 2026",
  "Le Gabon retrouve l'accès aux marchés internationaux après la levée partielle des sanctions de la CEMAC",
  "Les Panthères du Gabon qualifiées pour la CAN 2027 après leur victoire face au Maroc (2-0)",
];

interface Article {
  id: number;
  category: Category;
  label?: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: number;
  imageId: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Politique",
    label: "Transition",
    title: "Gabon : la junte fixe le cap — une Constitution, deux ans, et beaucoup de promesses à tenir",
    subtitle: "Le Comité pour la Transition et la Restauration des Institutions dévoile sa feuille de route définitive. Entre espoir populaire et scepticisme des partenaires internationaux, le pari d'Oligui Nguema n'est pas gagné d'avance.",
    author: "Jean-Baptiste Moussavou",
    date: "15 juillet 2026",
    readTime: 9,
    imageId: "photo-1529107386315-e1a2ed48a620",
    featured: true,
  },
  {
    id: 2,
    category: "Économie",
    label: "Pétrole",
    title: "La rente pétrolière gabonaise en chute libre — et après ?",
    subtitle: "Avec des réserves qui s'épuisent et des cours volatils, Libreville cherche un modèle de diversification. Les réponses tardent, l'urgence, elle, ne patiente pas.",
    author: "Rosalie Nguema",
    date: "15 juillet 2026",
    readTime: 6,
    imageId: "photo-1611974789855-9c2a0a7236a3",
  },
  {
    id: 3,
    category: "Sport",
    label: "CAN 2027",
    title: "Pierre-Emerick Aubameyang de retour en sélection — le choix qui divise",
    subtitle: "À 37 ans, l'ancien capitaine des Panthères répond à l'appel du nouveau sélectionneur. Une décision aussi symbolique que controversée.",
    author: "Didier Obiang",
    date: "14 juillet 2026",
    readTime: 5,
    imageId: "photo-1574629810360-7efbbe195018",
  },
  {
    id: 4,
    category: "Culture",
    label: "Musique",
    title: "Afrobeats gabonais : comment Libreville s'impose sur la scène continentale",
    subtitle: "Une nouvelle génération d'artistes gabonais cartonne de Dakar à Nairobi. La capitale, longtemps dans l'ombre d'Abidjan et de Lagos, revendique enfin sa place.",
    author: "Amélie Ondo",
    date: "14 juillet 2026",
    readTime: 4,
    imageId: "photo-1470229722913-7c0e2dbbafd3",
  },
  {
    id: 5,
    category: "Politique",
    label: "Diplomatie",
    title: "Le Gabon réintègre l'Union Africaine — un retour sous conditions",
    subtitle: "Suspendu après le coup d'État d'août 2023, Libreville retrouve son siège à Addis-Abeba. La communauté internationale surveille de près les engagements pris.",
    author: "Jean-Baptiste Moussavou",
    date: "13 juillet 2026",
    readTime: 7,
    imageId: "photo-1543269865-cbf427effbad",
  },
  {
    id: 6,
    category: "Économie",
    label: "Forêt",
    title: "La forêt gabonaise, poumon de l'Afrique centrale — et manne financière inexploitée",
    subtitle: "Le Gabon détient 90 % de couverture forestière. Les crédits carbone pourraient rapporter des milliards. Mais à qui, exactement ?",
    author: "Rosalie Nguema",
    date: "13 juillet 2026",
    readTime: 5,
    imageId: "photo-1448375240586-882707db888b",
  },
  {
    id: 7,
    category: "Sport",
    label: "Football",
    title: "Le Stade de l'Amitié rénové — Libreville prête pour accueillir la CAN 2027",
    subtitle: "Après dix-huit mois de travaux titanesques, l'enceinte de 40 000 places rouvre ses portes. La ville retient son souffle.",
    author: "Didier Obiang",
    date: "12 juillet 2026",
    readTime: 4,
    imageId: "photo-1522778119026-d647f0596c20",
  },
  {
    id: 8,
    category: "Culture",
    label: "Patrimoine",
    title: "Les masques du Gabon à Paris — une exposition, un contentieux colonial, un débat qui dure",
    subtitle: "Le musée du Quai Branly expose deux cents objets rituels gabonais. À Libreville, la restitution de ces pièces est réclamée depuis trente ans.",
    author: "Amélie Ondo",
    date: "12 juillet 2026",
    readTime: 6,
    imageId: "photo-1524985069026-dd778a71c7b4",
  },
  {
    id: 9,
    category: "Politique",
    label: "Justice",
    title: "Procès Ali Bongo : la Cour suprême annonce l'ouverture des débats pour octobre",
    subtitle: "L'ancien président et plusieurs de ses proches comparaîtront pour détournement de fonds publics et abus de biens sociaux. Un symbole fort pour la transition.",
    author: "Jean-Baptiste Moussavou",
    date: "11 juillet 2026",
    readTime: 8,
    imageId: "photo-1589829545856-d10d557cf95f",
  },
  {
    id: 10,
    category: "Économie",
    label: "Investissement",
    title: "Le FMI débloque 340 millions de dollars pour soutenir la transition économique gabonaise",
    subtitle: "La décision fait suite à l'accord signé en juin sur les réformes structurelles. L'argent sera fléché vers les infrastructures et la santé publique.",
    author: "Rosalie Nguema",
    date: "11 juillet 2026",
    readTime: 5,
    imageId: "photo-1611974789855-9c2a0a7236a3",
  },
];

const OPINION = {
  title: "Le Gabon ne manque pas de pétrole. Il manque d'institutions.",
  author: "Prof. Mireille Abaïssou",
  role: "Politologue, Université Omar Bongo",
  excerpt: "On refait une Constitution comme on repeint une façade lézardée. Le problème, c'est le mur d'en dessous.",
};

const LIVE_UPDATES = [
  { time: "14:32", text: "Le porte-parole du CTRI confirme la tenue du référendum avant fin 2026." },
  { time: "13:18", text: "Les syndicats de la fonction publique suspendent leur préavis de grève." },
  { time: "11:45", text: "Ouverture du sommet économique de Libreville en présence de 22 délégations étrangères." },
  { time: "09:20", text: "Accord signé avec Total Energies pour le maintien des concessions jusqu'en 2034." },
];

// Composants

function Label({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <span
      className={`inline-block text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 ${
        accent ? "bg-accent text-accent-foreground" : "text-accent"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {text}
    </span>
  );
}

function Meta({ author, date, readTime }: { author: string; date: string; readTime: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      <span className="text-[11px] font-medium text-foreground/70">{author}</span>
      <span className="text-[9px]">·</span>
      <span className="text-[11px]">{date}</span>
      <span className="text-[9px]">·</span>
      <Clock size={9} />
      <span className="text-[11px]">{readTime} min</span>
    </div>
  );
}

function CompactCard({ article }: { article: Article }) {
  return (
    <article className="group cursor-pointer py-3 border-b border-border last:border-0 flex gap-3">
      <div className="flex-1 min-w-0">
        <Label text={article.category} />
        <h3
          className="mt-1 text-[13px] font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-150 line-clamp-3"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          {article.title}
        </h3>
        <div className="mt-1.5">
          <Meta author={article.author} date={article.date} readTime={article.readTime} />
        </div>
      </div>
      <div
        className="w-16 h-16 flex-shrink-0 bg-muted"
        style={{
          backgroundImage: `url(https://images.unsplash.com/${article.imageId}?w=128&h=128&fit=crop&auto=format)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </article>
  );
}

function ColumnCard({ article }: { article: Article }) {
  return (
    <article className="group cursor-pointer flex flex-col gap-2 border-l border-border pl-4">
      <Label text={article.label || article.category} />
      <h3
        className="text-[14px] font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-150"
        style={{ fontFamily: "Playfair Display, Georgia, serif" }}
      >
        {article.title}
      </h3>
      <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
        {article.subtitle}
      </p>
      <Meta author={article.author} date={article.date} readTime={article.readTime} />
    </article>
  );
}

function GridCard({ article, showImage = true }: { article: Article; showImage?: boolean }) {
  return (
    <article className="group cursor-pointer flex flex-col gap-2">
      {showImage && (
        <div
          className="w-full aspect-[4/3] bg-muted"
          style={{
            backgroundImage: `url(https://images.unsplash.com/${article.imageId}?w=400&h=300&fit=crop&auto=format)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <Label text={article.label || article.category} />
      <h3
        className="text-[15px] font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-150"
        style={{ fontFamily: "Playfair Display, Georgia, serif" }}
      >
        {article.title}
      </h3>
      <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block" style={{ fontFamily: "Inter, sans-serif" }}>
        {article.subtitle}
      </p>
      <Meta author={article.author} date={article.date} readTime={article.readTime} />
    </article>
  );
}

function BreakingTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % BREAKING.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-accent text-accent-foreground flex items-stretch">
      <div className="flex items-center gap-2 px-3 py-2 bg-foreground flex-shrink-0">
        <Wifi size={10} className="text-accent animate-pulse" />
      </div>
      <div className="flex-1 overflow-hidden px-4 flex items-center">
        <p
          className={`text-[11px] font-medium truncate transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {BREAKING[idx]}
        </p>
      </div>
    </div>
  );
}


export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | "Tout">("Tout");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const featured = ARTICLES[0];

  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filtered =
    activeCategory === "Tout"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>

      {}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/96 flex items-start justify-center pt-20 px-6">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-4 border-b-2 border-accent pb-4">
              <Search size={18} className="text-background/50" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Chercher une information, un auteur…"
                className="flex-1 bg-transparent text-background text-xl outline-none placeholder:text-background/30"
                style={{ fontFamily: "Playfair Display, serif" }}
              />
              <button onClick={() => setSearchOpen(false)}>
                <X size={18} className="text-background/50 hover:text-background transition-colors" />
              </button>
            </div>
            <p className="mt-3 text-background/30 text-[11px]" style={{ fontFamily: "Inter, sans-serif" }}>Appuyez sur Échap pour fermer</p>
          </div>
        </div>
      )}

      {}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <span className="text-2xl font-black" style={{ fontFamily: "Playfair Display, serif" }}>
              La<span className="text-accent">Presse</span>
            </span>
            <button onClick={() => setMenuOpen(false)}><X size={20} /></button>
          </div>
          <nav className="flex flex-col px-5 py-8 gap-5">
            {(["Tout", ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat as typeof activeCategory); setMenuOpen(false); }}
                className="text-left text-3xl font-bold text-foreground hover:text-accent transition-colors"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      )}

      {}
      <div className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-1.5 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground capitalize">{dateStr}</span>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="hidden sm:inline">Libreville · 28°C ☀</span>
            <span>|</span>
            <a href="#" className="hover:text-accent transition-colors">S'abonner</a>
            <a href="#" className="hover:text-accent transition-colors">Connexion</a>
          </div>
        </div>
      </div>

      {}
      <header className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={20} />
            </button>

            {/* Logo centered on mobile, left on desktop */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <h1
                className="text-4xl lg:text-5xl font-black tracking-tight select-none"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                La<span className="text-accent">Presse</span>
                <span className="block text-[10px] font-normal tracking-[0.25em] uppercase text-muted-foreground mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Gabon · L'information qui compte
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Search size={16} />
              </button>
              <a
                href="#"
                className="hidden sm:inline-flex bg-accent text-accent-foreground text-[10px] font-semibold tracking-wider px-4 py-2 hover:bg-foreground transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                S'abonner
              </a>
            </div>
          </div>

          {/* Desktop nav — Le Monde style: flat, dense, small caps */}
          <nav className="hidden lg:flex items-stretch border-t border-foreground/20">
            {(["Tout", ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as typeof activeCategory)}
                className={`text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 border-r border-foreground/10 last:border-0 transition-colors duration-150 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {cat}
              </button>
            ))}
            <div className="flex-1" />
            <div className="flex items-center gap-4 px-4 text-[10px] text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>Gabon · Actualité · Analyse</span>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Breaking ── */}
      <BreakingTicker />

      {/* ── Main ── */}
      <main className="max-w-screen-xl mx-auto px-4 lg:px-8">

        {activeCategory === "Tout" ? (
          <>
            {/* Hero — article principal en pleine largeur */}
            <section className="border-b border-border py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">

                {/* Featured — takes up 7 cols on large, full on mobile */}
                <article className="group cursor-pointer lg:col-span-7 lg:border-r lg:border-border lg:pr-8">
                  {/* Large image */}
                  <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={`https://images.unsplash.com/${featured.imageId}?w=1000&h=563&fit=crop&auto=format`}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {featured.label && (
                      <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[9px] font-black tracking-widest uppercase px-2 py-1" style={{ fontFamily: "Inter, sans-serif" }}>
                        {featured.label}
                      </span>
                    )}
                  </div>

                  {/* Headline — very large */}
                  <div className="pt-4 pb-2">
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-accent" style={{ fontFamily: "Inter, sans-serif" }}>
                      {featured.category}
                    </span>
                    <h2
                      className="mt-2 text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.1] text-foreground group-hover:text-accent/90 transition-colors duration-150"
                      style={{ fontFamily: "Playfair Display, Georgia, serif", letterSpacing: "-0.01em" }}
                    >
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                      {featured.subtitle}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Meta author={featured.author} date={featured.date} readTime={featured.readTime} />
                    </div>
                    <button
                      className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Lire l'article <ArrowUpRight size={11} />
                    </button>
                  </div>
                </article>

                {/* Right column — 3 secondary stories + live feed */}
                <div className="lg:col-span-5 flex flex-col">

                  {/* Live updates */}
                  <div className="bg-muted p-4 mb-4 hidden lg:block">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    </div>
                    <ul className="space-y-2">
                      {LIVE_UPDATES.map((u, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[10px] font-semibold text-accent flex-shrink-0 mt-0.5 tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>{u.time}</span>
                          <p className="text-[11px] text-foreground/80 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{u.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Secondary articles */}
                  <div className="divide-y divide-border flex-1">
                    {ARTICLES.slice(1, 4).map((article) => (
                      <CompactCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Grille de 4 articles */}
            <section className="border-b border-border py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ARTICLES.slice(4, 8).map((article) => (
                  <GridCard key={article.id} article={article} showImage={true} />
                ))}
              </div>
            </section>

            {/* Contenu principal + colonne latérale */}
            <section className="py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main: 3 column stories */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-0.5 h-4 bg-accent" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Décryptages
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {ARTICLES.slice(7, 10).map((article) => (
                      <ColumnCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6">

                  {/* Opinion */}
                  <div className="bg-foreground text-background p-5">
                    <span className="text-[9px] font-black tracking-widest uppercase text-accent" style={{ fontFamily: "Inter, sans-serif" }}>Tribune</span>
                    <blockquote
                      className="mt-2 text-base font-bold italic leading-snug"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      « {OPINION.title} »
                    </blockquote>
                    <p className="mt-2 text-[11px] text-background/60 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                      {OPINION.excerpt}
                    </p>
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold text-background">{OPINION.author}</p>
                      <p className="text-[10px] text-background/40">{OPINION.role}</p>
                    </div>
                    <button className="mt-3 flex items-center gap-1 text-accent text-[10px] font-semibold hover:gap-2 transition-all" style={{ fontFamily: "Inter, sans-serif" }}>
                      Lire la tribune <ArrowUpRight size={10} />
                    </button>
                  </div>

                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={12} className="text-accent" />
                      <span className="text-[9px] font-black tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Les plus lus</span>
                    </div>
                    <ol className="space-y-3.5">
                      {ARTICLES.slice(0, 5).map((a, i) => (
                        <li key={a.id} className="group flex items-start gap-2.5 cursor-pointer">
                          <span
                            className="text-2xl font-black text-muted-foreground/30 leading-none flex-shrink-0 group-hover:text-accent transition-colors"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <Label text={a.category} />
                            <p
                              className="text-[12px] font-bold leading-snug text-foreground group-hover:text-accent transition-colors mt-0.5 line-clamp-2"
                              style={{ fontFamily: "Playfair Display, serif" }}
                            >
                              {a.title}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Newsletter */}
                  <div className="border border-border p-4">
                    <span className="text-[9px] font-black tracking-widest uppercase text-accent" style={{ fontFamily: "Inter, sans-serif" }}>Newsletter Gabon</span>
                    <h3 className="mt-1.5 text-sm font-bold leading-snug" style={{ fontFamily: "Playfair Display, serif" }}>
                      L'essentiel du Gabon. Chaque matin à 7h.
                    </h3>
                    <div className="mt-3 flex">
                      <input
                        type="email"
                        placeholder="email@exemple.com"
                        className="flex-1 border border-border bg-transparent px-2.5 py-2 text-[11px] outline-none focus:border-accent transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                      <button
                        className="bg-foreground text-background px-3 py-2 text-[10px] font-semibold hover:bg-accent transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            {/* Sections par catégorie */}
            {CATEGORIES.map((cat) => {
              const catArts = ARTICLES.filter((a) => a.category === cat);
              return (
                <section key={cat} className="border-t border-foreground/20 py-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-5 bg-accent" />
                      <h2
                        className="text-lg font-black text-foreground"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {cat}
                      </h2>
                    </div>
                    <button
                      className="flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground hover:text-accent transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Tout voir <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {catArts.map((a, i) => (
                      <GridCard key={a.id} article={a} showImage={i === 0} />
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        ) : (
          /* Filtered view */
          <div className="py-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-0.5 h-8 bg-accent" />
              <h2 className="text-3xl font-black" style={{ fontFamily: "Playfair Display, serif" }}>{activeCategory}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((a) => (
                <GridCard key={a.id} article={a} showImage />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-foreground bg-foreground text-background mt-12">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-xl font-black" style={{ fontFamily: "Playfair Display, serif" }}>
                La<span className="text-accent">Presse</span>
              </h2>
              <p className="mt-2 text-[10px] text-background/40 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Le Gabon. L'Afrique. Le monde. Sans filtre.
              </p>
            </div>
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                <h3 className="text-[9px] font-black tracking-widest uppercase text-background/40 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>{cat}</h3>
                <ul className="space-y-2">
                  {ARTICLES.filter((a) => a.category === cat).slice(0, 2).map((a) => (
                    <li key={a.id}>
                      <a href="#" className="text-[10px] text-background/60 hover:text-accent transition-colors leading-snug block line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-5 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] text-background/25" style={{ fontFamily: "Inter, sans-serif" }}>
            <span>© 2026 LaPresse Gabon. Tous droits réservés.</span>
            <div className="flex gap-4">
              {["Mentions légales", "CGU", "Charte éthique", "Contact"].map((l) => (
                <a key={l} href="#" className="hover:text-background/50 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
