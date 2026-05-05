import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Reveal, StaggerGroup, StaggerItem, easeLuxury } from "@/components/shared/Motion";
import { LEADERBOARD } from "@/lib/mock-data/seed";
import { cn } from "@/lib/utils";

type Post = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  body: string;
  image?: string;
  likes: number;
  liked?: boolean;
  comments: { id: string; author: string; body: string }[];
};

const SEED_POSTS: Post[] = [
  {
    id: "p1",
    authorId: "u-1",
    authorName: "Anya Petrov",
    authorAvatar: LEADERBOARD[0].profileImageUrl,
    timeAgo: "2 hours ago",
    body: "First light over Khufu this morning. Sirocco was a quiet companion — I think he knew the silence was the point.",
    image: LEADERBOARD[0].profileImageUrl,
    likes: 24,
    comments: [
      { id: "c1", author: "Kenji Hayashi", body: "Beautifully said." },
      { id: "c2", author: "Sophia Almeida", body: "On my list for May." },
    ],
  },
  {
    id: "p2",
    authorId: "u-2",
    authorName: "James Okafor",
    authorAvatar: LEADERBOARD[2].profileImageUrl,
    timeAgo: "yesterday",
    body: "Returned from Saqqara. The dressage hour with Master Hassan changed how I sit. Recommended without hesitation.",
    likes: 18,
    comments: [],
  },
  {
    id: "p3",
    authorId: "u-5",
    authorName: "Sophia Almeida",
    authorAvatar: LEADERBOARD[1].profileImageUrl,
    timeAgo: "3 days ago",
    body: "Letter to the house: thank you for the private dinner under Sirius. We will be back in autumn.",
    likes: 31,
    comments: [{ id: "c3", author: "Anya Petrov", body: "The astronomer is exceptional." }],
  },
];

const EVENTS = [
  { id: "e1", date: "May 12", name: "Sunrise sitting · Al-Nasr", spots: 3 },
  { id: "e2", date: "May 19", name: "Dressage clinic · Saqqara", spots: 2 },
  { id: "e3", date: "Jun 02", name: "Desert dinner · House of Horus", spots: 1 },
];

const Cercle = () => {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [composer, setComposer] = useState("");
  const me = LEADERBOARD[0];

  const onLike = (id: string) => {
    setPosts((p) => p.map((x) => x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x));
  };

  const onPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composer.trim()) return;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      authorId: me.id,
      authorName: me.fullName,
      authorAvatar: me.profileImageUrl,
      timeAgo: "just now",
      body: composer.trim(),
      likes: 0,
      comments: [],
    };
    setPosts((p) => [newPost, ...p]);
    setComposer("");
    toast.success("Posted to Le Cercle.");
  };

  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="container py-16 md:py-24 border-b hairline">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-4">Le Cercle</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-balance">
            A small society of riders, in their own words.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft text-pretty">
            Members share their hours at Giza — letters, photographs, and quiet recommendations between those who return.
          </p>
        </Reveal>
      </section>

      {/* Feed layout */}
      <section className="container py-16 md:py-24 grid lg:grid-cols-12 gap-12">
        {/* Left sidebar — me */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 self-start space-y-8">
          <Reveal>
            <div className="border hairline bg-surface-elevated/40 p-6">
              <div className="flex items-center gap-4">
                <span className="block size-14 overflow-hidden bg-surface">
                  <img src={me.profileImageUrl} alt="" className="h-full w-full object-cover grayscale" />
                </span>
                <div>
                  <p className="font-display text-xl leading-tight">{me.fullName}</p>
                  <p className="text-[10px] tracking-luxury uppercase text-ink-muted mt-1">{me.league} · № {String(me.position).padStart(2, "0")}</p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t hairline grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] tracking-luxury uppercase text-ink-muted">Rides</p>
                  <p className="font-display text-2xl tabular-nums mt-1">{me.ridesCompleted}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-luxury uppercase text-ink-muted">Points</p>
                  <p className="font-display text-2xl tabular-nums mt-1">{me.rankPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[10px] tracking-luxury uppercase text-ink-muted mb-4">Top of the Register</p>
            <ul className="border hairline divide-y divide-[var(--hairline,_#e7e2d5)]">
              {LEADERBOARD.slice(0, 5).map((r) => (
                <li key={r.id}>
                  <Link to={`/users/${r.id}`} className="flex items-center gap-3 p-4 hover:bg-surface/40 transition-colors">
                    <span className="font-display text-lg tabular-nums w-6 text-ink-muted">{String(r.position).padStart(2, "0")}</span>
                    <span className="block size-8 overflow-hidden bg-surface">
                      <img src={r.profileImageUrl} alt="" className="h-full w-full object-cover grayscale" />
                    </span>
                    <span className="font-display text-sm flex-1 truncate">{r.fullName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>

        {/* Feed */}
        <div className="lg:col-span-6 space-y-px">
          {/* Composer */}
          <Reveal>
            <form onSubmit={onPost} className="border hairline bg-background p-6">
              <p className="text-[10px] tracking-luxury uppercase text-ink-muted mb-3">Compose a letter</p>
              <textarea
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
                rows={3}
                placeholder="A note from the saddle…"
                className="w-full bg-transparent border-0 border-b hairline pb-3 text-base font-display leading-relaxed focus:outline-none focus:border-foreground transition-colors resize-none"
              />
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-[10px] tracking-luxury uppercase text-ink-muted">Visible to Le Cercle</p>
                <button
                  type="submit"
                  disabled={!composer.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-[11px] tracking-[0.18em] uppercase disabled:opacity-30"
                >
                  <Send className="size-3" /> Post
                </button>
              </div>
            </form>
          </Reveal>

          <StaggerGroup className="space-y-px pt-px" gap={0.06}>
            <AnimatePresence initial={false}>
              {posts.map((p) => (
                <StaggerItem key={p.id}>
                  <motion.article
                    layout
                    transition={{ duration: 0.6, ease: easeLuxury }}
                    className="border hairline bg-background p-6 md:p-8"
                  >
                    <header className="flex items-center gap-4">
                      <Link to={`/users/${p.authorId}`}>
                        <span className="block size-12 overflow-hidden bg-surface">
                          <img src={p.authorAvatar} alt="" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        </span>
                      </Link>
                      <div>
                        <Link to={`/users/${p.authorId}`} className="font-display text-xl leading-tight hover:underline">
                          {p.authorName}
                        </Link>
                        <p className="text-[10px] tracking-luxury uppercase text-ink-muted mt-0.5">{p.timeAgo}</p>
                      </div>
                    </header>

                    <p className="mt-6 font-display text-2xl md:text-[1.6rem] leading-[1.35] text-pretty">
                      {p.body}
                    </p>

                    {p.image && (
                      <div className="mt-6 overflow-hidden bg-surface aspect-[16/10]">
                        <img src={p.image} alt="" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                      </div>
                    )}

                    <footer className="mt-6 pt-5 border-t hairline flex items-center gap-6">
                      <button
                        onClick={() => onLike(p.id)}
                        className="inline-flex items-center gap-2 text-[10px] tracking-luxury uppercase text-ink-muted hover:text-foreground transition-colors"
                      >
                        <Heart className={cn("size-3.5 transition-colors", p.liked && "fill-foreground text-foreground")} />
                        {p.likes}
                      </button>
                      <span className="inline-flex items-center gap-2 text-[10px] tracking-luxury uppercase text-ink-muted">
                        <MessageCircle className="size-3.5" />
                        {p.comments.length}
                      </span>
                    </footer>

                    {p.comments.length > 0 && (
                      <ul className="mt-5 space-y-3">
                        {p.comments.map((c) => (
                          <li key={c.id} className="text-sm text-ink-soft leading-relaxed">
                            <span className="font-display text-foreground mr-2">{c.author}</span>
                            {c.body}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.article>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerGroup>
        </div>

        {/* Right sidebar — events */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 self-start space-y-8">
          <Reveal delay={0.15}>
            <p className="text-[10px] tracking-luxury uppercase text-ink-muted mb-4">Upcoming gatherings</p>
            <ul className="border hairline divide-y divide-[var(--hairline,_#e7e2d5)]">
              {EVENTS.map((e) => (
                <li key={e.id} className="p-5">
                  <p className="text-[10px] tracking-luxury uppercase text-ink-muted flex items-center gap-2">
                    <Calendar className="size-3" /> {e.date}
                  </p>
                  <p className="font-display text-lg leading-tight mt-2">{e.name}</p>
                  <p className="text-[10px] tracking-luxury uppercase text-ink-muted mt-2">{e.spots} seat{e.spots > 1 && "s"} remaining</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <Link to="/cercle" className="block border hairline p-6 bg-foreground text-background hover:opacity-90 transition-opacity">
              <p className="text-[10px] tracking-luxury uppercase text-background/60">Le Cercle</p>
              <p className="font-display text-xl mt-2 leading-tight">An invitation-led membership.</p>
              <p className="mt-4 text-[10px] tracking-luxury uppercase">Read the tiers →</p>
            </Link>
          </Reveal>
        </aside>
      </section>
    </div>
  );
};

export default Cercle;
