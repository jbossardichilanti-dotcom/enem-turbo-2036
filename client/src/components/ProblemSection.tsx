export default function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <div className="container relative mx-auto max-w-5xl px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-md">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight" data-testid="text-problem-title">
              Cansado de estudar sem resultados?
            </h2>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight" data-testid="text-problem-subtitle">
              O problema é falta de organização.
            </h2>
          </div>
          
          <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 flex items-center justify-center shadow-md">
            <p className="text-base md:text-xl text-foreground font-semibold leading-relaxed" data-testid="text-solution">
              Por isso criamos o <span className="text-primary font-black">ENEM Turbo 2025</span>: sinopses completas e organizadas de <span className="text-secondary font-black">todas as matérias</span> que você precisa revisar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
