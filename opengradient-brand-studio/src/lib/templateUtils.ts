import type { EditorState } from '../types/editor'
import type { TemplateDefinition } from '../types/template'

export function templateToEditorState(template: TemplateDefinition): EditorState {
  return {
    activeTemplateId: template.id,
    ...template.defaults,
  }
}
