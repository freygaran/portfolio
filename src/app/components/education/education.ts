import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  current: boolean;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  items: EducationItem[] = [
    {
      period: '2024 — 2026',
      degree: 'Master 2 SIGL',
      institution: 'Institut Universitaire de la Côte (IUC)',
      location: 'Douala, Cameroun',
      type: 'Master',
      description:
        "Formation approfondie en Systèmes d'Information et Génie Logiciel. Spécialisation en architecture logicielle, cybersécurité applicative, développement Fullstack avancé et gestion de projets SI.",
      tags: ['Architecture SI', 'Cybersécurité', 'Spring Boot', 'Angular', 'SGBD avancé', 'Scrum'],
      current: true,
    },
    {
      period: '2019 — 2023',
      degree: 'Licence en Génie Logiciel',
      institution: 'Université Adventiste de Cosendai',
      location: 'Douala, Cameroun',
      type: 'Licence',
      description:
        "Formation fondamentale en génie logiciel : algorithmique avancée, structures de données, développement web et mobile, conception orientée objet, bases de données relationnelles.",
      tags: ['Java', 'Python', 'C++', 'Algorithmique', 'UML', 'SQL'],
      current: false,
    },
  ];
}
