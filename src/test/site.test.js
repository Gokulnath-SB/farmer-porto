import { describe, expect, it } from 'vitest';
import {
  assets,
  certifications,
  experience,
  navItems,
  profile,
  projects,
  repositories,
  skillGroups,
} from '../data/site.js';

describe('verified content contract', () => {
  it('uses the owner’s supplied personal details', () => {
    expect(profile.name).toBe('GOKULNATH S B');
    expect(profile.degree).toBe('B.E. Computer Science and Engineering');
    expect(profile.college).toBe('Dhaanish Ahmed College of Engineering, Chennai.');
    expect(profile.gpa.map((item) => `${item.label}: ${item.value}`)).toEqual([
      'Semester 1: 8.64',
      'Semester 2: 9.12',
      'CGPA: 8.88',
    ]);
    expect(profile.social.github).toBe('https://github.com/Gokulnath-SB');
    expect(profile.social.whatsapp).toBe('https://wa.me/917339051316');
  });

  it('includes every requested navigation target', () => {
    expect(navItems.map((item) => item.id)).toEqual([
      'home',
      'about',
      'education',
      'skills',
      'projects',
      'experience',
      'certifications',
      'contact',
    ]);
  });

  it('shows exactly three featured projects and no Agri Bot', () => {
    expect(projects).toHaveLength(3);
    expect(projects.map((project) => project.id)).toEqual(['garmo', 'brocode', 'nano-spark']);
    expect(JSON.stringify(projects)).not.toMatch(/agri\s*bot/i);
    expect(projects[0].workflow).toEqual([
      'Order',
      'Cutting',
      'Stitching',
      'Quality Check',
      'Ironing',
      'Packing',
      'Dispatch',
    ]);
    expect(projects[1].links.live).toBe('https://brocode-ruddy.vercel.app');
    expect(projects[2].links.live).toBe('https://nanospark-360.vercel.app/');
  });

  it('never invents skill proficiency or metrics', () => {
    const text = JSON.stringify(skillGroups);
    expect(text).not.toMatch(/\d+\s*%/);
    expect(text).not.toMatch(/expert|advanced|proficient/i);
    expect(JSON.stringify(repositories)).not.toMatch(/followers|stars|contributions|stargazers/i);
  });

  it('marks unverified certification status honestly', () => {
    expect(certifications.find((item) => item.id === 'hackerrank-java').status).toBe('In Progress');
    expect(certifications).toHaveLength(4);
  });

  it('does not invent internship or hackathon achievements', () => {
    expect(experience).toHaveLength(2);
    const text = JSON.stringify(experience).toLowerCase();
    expect(text).not.toMatch(/award|won|deployed|winner/i);
    expect(text).not.toMatch(/20\d\d-\d\d/);
  });

  it('uses only https URLs for external resources', () => {
    const all = [assets, profile.social, ...projects.map((p) => p.links), ...repositories];
    const urls = JSON.stringify(all).match(/https?:\/\/[^"\s]+/g) ?? [];
    expect(urls.length).toBeGreaterThan(10);
    expect(urls.every((url) => url.startsWith('https://'))).toBe(true);
  });
});
