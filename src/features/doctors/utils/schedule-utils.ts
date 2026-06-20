/**
 * Parse a schedule string into consultant, outdoor, and general parts.
 *
 * Lines starting with "Consultant:" (case-insensitive) go into the consultant part,
 * lines starting with "Outdoor:" go into the outdoor part, and all other lines
 * go into the general part. The prefix is stripped from consultant/outdoor lines.
 */
export function parseSchedule(schedule: string): { consultant: string; outdoor: string; general: string } {
  const lines = schedule.split('\n')
  const consultant: string[] = []
  const outdoor: string[] = []
  const general: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.toLowerCase().startsWith('consultant')) {
      consultant.push(trimmed.replace(/^consultant:\s*/i, '').trim())
    } else if (trimmed.toLowerCase().startsWith('outdoor')) {
      outdoor.push(trimmed.replace(/^outdoor:\s*/i, '').trim())
    } else {
      general.push(trimmed)
    }
  }
  return {
    consultant: consultant.join('\n'),
    outdoor: outdoor.join('\n'),
    general: general.join('\n'),
  }
}

/**
 * Combine consultant, outdoor, and general schedule parts into a single schedule string.
 * Consultant lines get the "Consultant: " prefix, outdoor lines get the "Outdoor: " prefix.
 */
export function combineSchedule(consultant: string, outdoor: string, general: string): string {
  const parts: string[] = []
  if (consultant.trim()) parts.push('Consultant: ' + consultant.trim())
  if (outdoor.trim()) parts.push('Outdoor: ' + outdoor.trim())
  if (general.trim()) parts.push(general.trim())
  return parts.join('\n')
}
