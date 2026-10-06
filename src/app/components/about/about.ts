import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective }       from '../../directives/reveal.directive';
import { TranslationService }    from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly ts = inject(TranslationService);

  get text() {
    return this.ts.lang() === 'en' ? {
      sectionLabel: 'About',
      title:        'I design',
      titleSpan:    'tailor-made digital solutions',
      bio1:         "Full Stack Developer with 4 years of experience, I design and build end-to-end digital solutions: websites, web and mobile applications, APIs and management systems. I have worked for banks, public institutions and private companies, which has taught me to quickly understand business needs and turn them into reliable, secure and user-friendly products.",
      bio2:         "Curious and adaptable, I enjoy taking on new technical challenges and supporting projects from the initial idea through to production. My goal: to put my skills at the service of ambitious teams to digitalize processes, improve user experience and create value, whatever the industry.",
      highlights: [
        'Digital solution design: web, mobile and custom management systems',
        'Full Stack: Spring Boot, Django, Angular, React, Flutter',
        'RESTful API architecture & systems integration (banking, institutional, services)',
        'Data & BI: KPI extraction, dashboards, decision support',
        'DevOps & quality: Docker, Kubernetes, AWS, Git, Agile/Scrum, Clean Code, TDD',
      ],
      cvBtn: 'Download CV',
      stats: [
        { value: '4+',  label: 'Years of experience' },
        { value: '8+',  label: 'Projects completed'  },
        { value: '20+', label: 'Technologies'        },
      ],
    } : {
      sectionLabel: 'À propos',
      title:        'Je conçois des solutions',
      titleSpan:    'digitales sur mesure',
      bio1:         "Développeur Full Stack avec 4 années d'expérience, je conçois et développe des solutions digitales de bout en bout : sites web, applications web et mobiles, APIs et systèmes de gestion. J'ai travaillé pour des banques, des institutions publiques et des entreprises privées, ce qui m'a appris à comprendre rapidement les besoins métiers et à les transformer en produits fiables, sécurisés et faciles à utiliser.",
      bio2:         "Curieux et adaptable, j'aime relever de nouveaux défis techniques et accompagner les projets de l'idée à la mise en production. Mon objectif : mettre mes compétences au service d'équipes ambitieuses pour digitaliser les processus, améliorer l'expérience des utilisateurs et créer de la valeur, quel que soit le secteur.",
      highlights: [
        'Conception de solutions digitales : web, mobile et systèmes de gestion sur mesure',
        'Full Stack : Spring Boot, Django, Angular, React, Flutter',
        'Architecture API RESTful & intégration de systèmes (bancaire, institutionnel, services)',
        'Données & BI : extraction de KPIs, tableaux de bord, aide à la décision',
        'DevOps & qualité : Docker, Kubernetes, AWS, Git, Agile/Scrum, Clean Code, TDD',
      ],
      cvBtn: 'Télécharger CV',
      stats: [
        { value: '4+',  label: "Ans d'expérience" },
        { value: '8+',  label: 'Projets réalisés'  },
        { value: '20+', label: 'Technologies'      },
      ],
    };
  }
}
