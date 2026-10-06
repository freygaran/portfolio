import { Component, AfterViewInit, OnDestroy, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService }       from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements AfterViewInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly ts           = inject(TranslationService);

  scrolled       = signal(false);
  expanded       = signal(false);   // menu horizontal déroulé (desktop)
  menuOpen       = signal(false);   // menu vertical (mobile / tablette)
  activeSection  = signal<string>('');
  theme          = this.themeService.theme;
  lang           = this.ts.lang;

  private sectionIds = ['#about', '#skills', '#projects', '#education', '#experience', '#contact'];
  private observer!: IntersectionObserver;
  private readonly SCROLL_THRESHOLD = 60;
  private readonly COMPACT_QUERY = '(max-width: 1100px)'; // doit correspondre à $bp dans le SCSS
  textBalise = '<A/>';

  get navLinks() {
    const l = this.lang();
    return [
      { label: l === 'fr' ? 'À propos'    : 'About',      href: '#about'      },
      { label: l === 'fr' ? 'Compétences' : 'Skills',     href: '#skills'     },
      { label: l === 'fr' ? 'Projets'     : 'Projects',   href: '#projects'   },
      { label: l === 'fr' ? 'Formation'   : 'Education',  href: '#education'  },
      { label: l === 'fr' ? 'Expérience'  : 'Experience', href: '#experience' },
      { label: 'Contact',                                    href: '#contact'    },
    ];
  }

  get navCta() { return this.lang() === 'fr' ? 'Me contacter' : 'Contact me'; }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set('#' + entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    this.sectionIds.forEach(id => {
      const el = document.querySelector(id);
      if (el) this.observer.observe(el);
    });

    // État initial (ex : rechargement de la page en milieu de scroll)
    this.onScroll();
  }

  ngOnDestroy() { this.observer?.disconnect(); }

  /**
   * Déroule le menu quand on quitte le haut de page, le rempile quand on y revient.
   * On ne réagit qu'au franchissement du seuil : un clic manuel sur le A reste donc
   * respecté tant que l'on ne repasse pas le seuil.
   */
  @HostListener('window:scroll')
  onScroll() {
    const isScrolled = window.scrollY > this.SCROLL_THRESHOLD;
    if (isScrolled !== this.scrolled()) {
      this.scrolled.set(isScrolled);
      this.expanded.set(isScrolled);
    }
  }

  /** Clic sur le A : menu horizontal sur desktop, menu vertical sur mobile. */
  toggle() {
    if (window.matchMedia(this.COMPACT_QUERY).matches) {
      this.toggleMenu();
    } else {
      this.expanded.update(v => !v);
    }
  }

  toggleMenu()  { this.menuOpen.update(v => !v); }
  toggleTheme() { this.themeService.toggle(); }
  toggleLang()  { this.ts.toggle(); }

  scrollTo(href: string) {
    this.menuOpen.set(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}