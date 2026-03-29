import { useEffect, useMemo, useState, type CSSProperties } from "react";

const mvp = [
  "Timeline de marcos com status de entrega.",
  "Canal de mensagens e anexos por projeto.",
  "Fluxo de aprovacao e revisao de entrega.",
  "Area de documentos e contratos."
];
const hero = "https://picsum.photos/seed/client-portal-pro-hero/1920/1080";

function revealOnScroll() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
    for (const node of nodes) {
      node.classList.add("show");
    }

    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 }
  );

  for (const node of nodes) {
    observer.observe(node);
  }

  return () => observer.disconnect();
}

export default function App() {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL || "http://localhost:4000", []);
  const [status, setStatus] = useState<{ ok: boolean; label: string }>({ ok: true, label: "Validando backend..." });

  useEffect(() => {
    const clean = revealOnScroll();
    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (!res.ok) throw new Error();
        setStatus({ ok: true, label: "API online e pronta para integracao." });
      })
      .catch(() => setStatus({ ok: false, label: "API indisponivel no momento." }));
    return clean;
  }, [apiUrl]);

  return (
    <div className="page">
      <header className="hero full-bleed" style={{ "--hero": `url(${hero})` } as CSSProperties}>
        <nav className="nav"><p className="brand">Client Portal Pro</p><a className="btn btn-ghost" href="#mvp">MVP</a></nav>
        <div className="hero-content">
          <p className="eyebrow">client-success</p>
          <h1>Portal de cliente para gestao de projeto com transparencia total.</h1>
          <p className="lead">Clientes ficam sem visibilidade de progresso em canais fragmentados.</p>
          <div className="actions"><a className="btn btn-primary" href="#mvp">Ver plano de entrega</a><a className="btn btn-ghost" href="#cta">Iniciar implementacao</a></div>
          <p className={`status ${status.ok ? "status-ok" : "status-warn"}`}>{status.label}</p>
        </div>
      </header>
      <main className="shell">
        <section id="mvp" className="section" data-reveal><p className="label">MVP estrategico</p><h2>Entrega com foco em valor de negocio.</h2><ul className="list">{mvp.map((item) => <li key={item}><span className="dot" /><span>{item}</span></li>)}</ul></section>
        <section className="section split" data-reveal>
          <article><p className="label">Execucao senior</p><h2>Qualidade continua com previsibilidade de entrega.</h2><ol className="track"><li>Arquitetura modular e contratos claros.</li><li>Lint, testes e build como gates obrigatorios.</li><li>Deploy com checklist tecnico e observabilidade.</li></ol></article>
          <article><p className="label">Produto</p><h2>Plano mensal por clientes ativos.</h2><p className="lead" style={{ color: "var(--muted)" }}>Base pronta para evoluir com autenticacao, banco e analytics.</p></article>
        </section>
        <section id="cta" className="section" data-reveal><p className="label">Proximo passo</p><h2>Comece a sprint 1 agora.</h2><div className="actions"><button type="button" className="btn btn-primary">Abrir backlog</button><button type="button" className="btn btn-ghost">Preparar deploy</button></div></section>
      </main>
      <footer className="footer"><p>Client Portal Pro</p><p>{new Date().getFullYear()} - Projeto com padrao senior.</p></footer>
    </div>
  );
}
