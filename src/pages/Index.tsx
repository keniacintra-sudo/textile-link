import { useNavigate } from 'react-router-dom';
import { Zap, Sparkles, Handshake, TrendingUp, Shield, Globe, ArrowRight, Leaf, Users, Factory } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'IA Inteligente', description: 'Sugestões automáticas de parceiros ideais para seu pedido', delay: 100 },
  { icon: Handshake, title: 'Conexão Direta', description: 'Negocie propostas e prazos sem intermediários', delay: 200 },
  { icon: Leaf, title: 'Sustentável', description: 'Gestão de resíduos têxteis integrada à plataforma', delay: 300 },
  { icon: TrendingUp, title: 'Crescimento', description: 'Métricas e relatórios de impacto em tempo real', delay: 400 },
];

const testimonials = [
  { name: 'Marina Costa', role: 'Marca · São Paulo', quote: 'Reduzimos o tempo de busca por facções de 2 semanas para 2 horas.' },
  { name: 'Carlos Silva', role: 'Facção · Minas Gerais', quote: 'Nossa produção cresceu 40% desde que entramos na plataforma.' },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background" style={{ minHeight: '100dvh' }}>
      {/* ── Hero ── */}
      <div
        className="shrink-0 relative overflow-hidden flex flex-col items-center text-center"
        style={{
          background: 'linear-gradient(160deg, hsl(222 84% 11%) 0%, hsl(222 47% 16%) 50%, hsl(217 33% 22%) 100%)',
          padding: '56px 24px 56px',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06] blur-3xl" style={{ background: 'hsl(160 84% 50%)' }} />
        <div className="absolute bottom-0 -left-16 w-48 h-48 rounded-full opacity-[0.04] blur-3xl" style={{ background: 'hsl(217 91% 60%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl" style={{ background: 'hsl(160 84% 50%)' }} />

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-8 animate-fade-in">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, hsl(160 84% 39%), hsl(160 60% 45%))' }}
          >
            <Zap size={22} className="text-accent-foreground" />
          </div>
          <span className="font-sans font-extrabold text-[20px] tracking-tight" style={{ color: 'hsl(210 40% 98%)' }}>
            ELO Moda
          </span>
        </div>

        {/* Badge */}
        <div
          className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: 'hsla(160, 84%, 39%, 0.12)',
            border: '1px solid hsla(160, 84%, 39%, 0.2)',
            animationDelay: '100ms',
            animationFillMode: 'both',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-sans text-[12px] font-semibold tracking-wide" style={{ color: 'hsl(160 84% 55%)' }}>
            Plataforma ativa · 500+ conexões
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-sans animate-fade-in"
          style={{
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: 'hsl(210 40% 98%)',
            maxWidth: 360,
            animationDelay: '150ms',
            animationFillMode: 'both',
          }}
        >
          A Conexão Inteligente para a Cadeia Produtiva da Moda
        </h1>

        <p
          className="font-sans animate-fade-in"
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            marginTop: 16,
            color: 'hsl(215 20% 68%)',
            maxWidth: 300,
            fontWeight: 400,
            animationDelay: '250ms',
            animationFillMode: 'both',
          }}
        >
          Marcas, facções e artesãos em um só lugar
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: '350ms', animationFillMode: 'both' }}>
          <button
            onClick={() => navigate('/escolher-perfil')}
            className="btn-primary flex items-center gap-2"
            style={{ fontSize: 15, padding: '14px 32px' }}
          >
            Começar agora
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-outline"
            style={{ fontSize: 14, padding: '14px 24px', borderColor: 'hsla(210, 40%, 98%, 0.15)', color: 'hsl(210 40% 98%)' }}
          >
            Entrar
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
          {[
            { icon: Users, value: '500+', label: 'Conexões' },
            { icon: Factory, value: '120+', label: 'Facções' },
            { icon: Shield, value: '98%', label: 'Satisfação' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon size={14} style={{ color: 'hsl(160 84% 50%)' }} />
              <div className="text-left">
                <p className="font-sans font-extrabold text-[14px] leading-none" style={{ color: 'hsl(210 40% 98%)' }}>{stat.value}</p>
                <p className="font-sans text-[10px] mt-0.5" style={{ color: 'hsl(215 20% 55%)' }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div className="px-5 pt-10 pb-2">
        <p className="font-sans text-muted-foreground text-[11px] font-semibold tracking-[0.1em] uppercase pl-1 mb-1.5">
          Por que ELO Moda?
        </p>
        <h2 className="font-sans text-foreground text-[22px] font-bold tracking-tight pl-1 mb-6">
          Tudo que você precisa
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="card-elevated flex flex-col animate-slide-up"
              style={{
                padding: '20px 16px',
                animationDelay: `${feat.delay}ms`,
                animationFillMode: 'both',
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                style={{
                  background: i % 2 === 0
                    ? 'hsla(160, 84%, 39%, 0.1)'
                    : 'hsla(217, 91%, 60%, 0.08)',
                }}
              >
                <feat.icon
                  size={20}
                  style={{
                    color: i % 2 === 0
                      ? 'hsl(160 84% 39%)'
                      : 'hsl(217 91% 60%)',
                  }}
                />
              </div>
              <p className="font-sans font-bold text-[14px] text-foreground leading-snug">{feat.title}</p>
              <p className="font-sans text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="px-5 pt-10">
        <p className="font-sans text-muted-foreground text-[11px] font-semibold tracking-[0.1em] uppercase pl-1 mb-1.5">
          Simples e rápido
        </p>
        <h2 className="font-sans text-foreground text-[22px] font-bold tracking-tight pl-1 mb-6">
          Como funciona
        </h2>

        <div className="flex flex-col gap-4">
          {[
            { step: '01', title: 'Crie seu perfil', desc: 'Cadastre-se como marca, facção ou artesão em menos de 2 minutos.', color: 'hsl(160 84% 39%)' },
            { step: '02', title: 'Publique ou encontre', desc: 'Crie pedidos ou descubra oportunidades que combinam com seu perfil.', color: 'hsl(217 91% 60%)' },
            { step: '03', title: 'Conecte e produza', desc: 'Negocie, aceite propostas e acompanhe tudo em tempo real.', color: 'hsl(43 96% 56%)' },
          ].map((item, i) => (
            <div
              key={item.step}
              className="flex items-start gap-4 animate-slide-up"
              style={{ animationDelay: `${500 + i * 100}ms`, animationFillMode: 'both' }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-sans font-extrabold text-[13px]"
                style={{ background: `color-mix(in srgb, ${item.color} 12%, transparent)`, color: item.color }}
              >
                {item.step}
              </div>
              <div className="pt-0.5">
                <p className="font-sans font-bold text-[15px] text-foreground">{item.title}</p>
                <p className="font-sans text-[13px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="px-5 pt-10">
        <p className="font-sans text-muted-foreground text-[11px] font-semibold tracking-[0.1em] uppercase pl-1 mb-1.5">
          Depoimentos
        </p>
        <h2 className="font-sans text-foreground text-[22px] font-bold tracking-tight pl-1 mb-5">
          Quem já usa, aprova
        </h2>

        <div className="flex flex-col gap-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card-elevated animate-slide-up"
              style={{
                padding: '20px',
                animationDelay: `${800 + i * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              <p className="font-sans text-[13px] text-foreground/80 leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-[12px]"
                  style={{ background: 'hsla(160, 84%, 39%, 0.1)', color: 'hsl(160 84% 39%)' }}
                >
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-sans font-semibold text-[13px] text-foreground">{t.name}</p>
                  <p className="font-sans text-[11px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div
        className="mx-5 mt-10 rounded-2xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, hsl(222 84% 11%), hsl(222 47% 16%))',
          padding: '32px 24px',
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] blur-2xl" style={{ background: 'hsl(160 84% 50%)' }} />
        <div className="relative z-10 text-center">
          <h3 className="font-sans font-bold text-[20px] tracking-tight" style={{ color: 'hsl(210 40% 98%)' }}>
            Pronto para começar?
          </h3>
          <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'hsl(215 20% 65%)' }}>
            Junte-se a centenas de profissionais da moda que já transformaram sua produção.
          </p>
          <button
            onClick={() => navigate('/escolher-perfil')}
            className="btn-primary mt-6 flex items-center gap-2 mx-auto"
            style={{ fontSize: 15, padding: '14px 32px' }}
          >
            Começar agora
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border mt-10" style={{ padding: '24px 20px 28px' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary shadow-sm">
              <Zap size={13} className="text-primary-foreground" />
            </div>
            <span className="font-sans font-bold text-[14px] text-foreground">ELO Moda</span>
          </div>
          <div className="flex items-center gap-3.5">
            <Globe size={17} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
            <Shield size={17} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Plataforma</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Como funciona</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Recursos</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Preços</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Empresa</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Sobre nós</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Impacto</span>
            <span className="font-sans text-[12.5px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Contato</span>
          </div>
        </div>
        <p className="font-sans text-[11px] text-muted-foreground mt-5">
          © 2026 ELO Moda. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
