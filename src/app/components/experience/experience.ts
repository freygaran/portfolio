import { Component, AfterViewInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface ExperienceItem {
  period: string;
  year: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  current: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements AfterViewInit {
  private visibleSet = signal<Set<number>>(new Set());

  isVisible(i: number): boolean {
    return this.visibleSet().has(i);
  }

  items: ExperienceItem[] = [
    {
      period: 'Déc 2025 — Mai 2026', year: '2026',
      role: 'Développeur Fullstack',
      company: 'United Bank for Africa (UBA)',
      location: 'Douala, Cameroun',
      type: 'Stage professionel',
      description:
        "Développement de 3 projets bancaires : API RESTful de compensation interbancaire, application de gestion des incidents clearing (Angular + Spring Boot + SQL Server) et solution Data Analysis & Business Intelligence (MySQL + PowerBI).",
      tags: ['Spring Boot', 'Angular', 'SQL Server', 'MySQL', 'PowerBI', 'REST API'],
      current: true,
    },
    {
      period: 'Nov 2024 — Fév 2025', year: '2025',
      role: 'Développeur Web',
      company: 'Consulat du Gabon',
      location: 'Douala, Cameroun',
      type: 'CDD',
      description:
        'Conception et développement complet du site officiel du Consulat du Gabon : formulaires administratifs en ligne, système de prise de rendez-vous et espace de communication officielle.',
      tags: ['Angular', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
      current: false,
    },
    {
      period: 'Nov 2024 — Fév 2025', year: '2025',
      role: 'Développeur Web',
      company: 'La Camerounaise des Jeux',
      location: 'Douala, Cameroun',
      type: 'Freelance',
      description:
        "Conception, développement et déploiement du site vitrine institutionnel : gouvernance numérique, centralisation des services et interconnexion sécurisée.",
      tags: ['Angular', 'TypeScript', 'Node.js', 'MySQL'],
      current: false,
    },
    {
      period: 'Nov 2024 — Jan 2025', year: '2025',
      role: 'Développeur Web',
      company: 'École DuVALL',
      location: 'Douala, Cameroun',
      type: 'Freelance',
      description:
        "Modernisation de l'interface utilisateur, amélioration de l'expérience de navigation et renforcement de la présence numérique de l'école.",
      tags: ['Angular', 'TypeScript', 'SCSS', 'UI/UX'],
      current: false,
    },
    {
      period: 'Nov 2023 — Fév 2024', year: '2024',
      role: 'Développeur Mobile',
      company: 'Well Group',
      location: 'Douala, Cameroun',
      type: 'Stage professionel',
      description:
        "Application mobile Android & iOS de mise en relation entre entrepreneurs et donateurs : transactions sécurisées, digitalisation et gestion des identités (IAM).",
      tags: ['Flutter', 'Dart', 'Firebase', 'Android', 'iOS'],
      current: false,
    },
    {
      period: 'Nov 2023 — Fév 2024', year: '2024',
      role: 'Développeur Web',
      company: 'Buid Company',
      location: 'Douala, Cameroun',
      type: 'Stage',
      description:
        "Conception et déploiement du site web interne : centralisation des données, sécurisation de la communication et haute disponibilité des services.",
      tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
      current: false,
    },
  ];

  ngAfterViewInit() {
    // Vérification initiale pour les cartes déjà visibles au chargement
    setTimeout(() => this.checkVisible(), 200);
  }

  @HostListener('window:scroll')
  checkVisible() {
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>('.tree-node').forEach((node, i) => {
      const rect    = node.getBoundingClientRect();
      const inView  = rect.top < vh * 0.88 && rect.bottom > 0;
      const visible = this.visibleSet().has(i);

      if (inView && !visible) {
        this.visibleSet.update(s => new Set([...s, i]));
      } else if (!inView && visible) {
        this.visibleSet.update(s => { const n = new Set(s); n.delete(i); return n; });
      }
    });
  }
}
