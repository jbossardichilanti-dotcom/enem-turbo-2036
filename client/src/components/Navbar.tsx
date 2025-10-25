import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm shadow-sm border-b" data-testid="navbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary" data-testid="text-logo">
              ENEM TURBO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              data-testid="link-inicio"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('conteudo')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              data-testid="link-conteudo"
            >
              Conteúdo
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              data-testid="link-depoimentos"
            >
              Depoimentos
            </button>
            <Button
              onClick={() => scrollToSection('inscricao')}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              data-testid="button-inscreva-se"
            >
              Garantir Vaga
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            data-testid="button-menu-toggle"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" data-testid="mobile-menu">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                data-testid="link-inicio-mobile"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('conteudo')}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                data-testid="link-conteudo-mobile"
              >
                Conteúdo
              </button>
              <button
                onClick={() => scrollToSection('depoimentos')}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                data-testid="link-depoimentos-mobile"
              >
                Depoimentos
              </button>
              <Button
                onClick={() => scrollToSection('inscricao')}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold w-full"
                data-testid="button-inscreva-se-mobile"
              >
                Garantir Vaga
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
