
export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-black" data-testid="text-footer-logo">
              ENEM TURBO 2025
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="/termos"
              className="hover:text-accent transition-colors"
              data-testid="link-termos"
            >
              Termos de Uso
            </a>
            <a
              href="/termos"
              className="hover:text-accent transition-colors"
              data-testid="link-garantia"
            >
              Garantia de 5 Dias
            </a>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-background/20">
          <p className="text-sm opacity-80" data-testid="text-copyright">
            © 2025 ENEM Turbo - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
