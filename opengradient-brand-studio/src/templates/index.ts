import type { TemplateDefinition } from '../types/template'
import { brandGradientHero } from './brand-gradient-hero'
import { brandGradientSplit } from './brand-gradient-split'
import { darkTechAnnouncement } from './dark-tech-announcement'
import { darkTechFeature } from './dark-tech-feature'
import { darkTechStatement } from './dark-tech-statement'
import { socialQuote } from './social-quote'
import { threadCloser } from './thread-closer'
import { blogCover } from './blog-cover'

export const templates: TemplateDefinition[] = [
  brandGradientHero,
  brandGradientSplit,
  darkTechAnnouncement,
  darkTechFeature,
  darkTechStatement,
  socialQuote,
  threadCloser,
  blogCover,
]

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return templates.find(t => t.id === id)
}
