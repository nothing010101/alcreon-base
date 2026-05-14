const NOTION_TOKEN = import.meta.env.VITE_NOTION_TOKEN
const NOTION_DB_ID = '360abcd18a1681c69119e82ec8a5a030'

export interface Editorial {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tag: string
  author: string
  publishAt: string
  featured: boolean
  readTime: string
  type: 'Editorial' | 'Briefing'
}

function mapNotionPage(page: Record<string, unknown>): Editorial {
  const props = page.properties as Record<string, Record<string, unknown>>
  const titleArr = props.Title?.title as { plain_text: string }[] | undefined
  const excerptArr = props.Excerpt?.rich_text as { plain_text: string }[] | undefined
  const contentArr = props.Content?.rich_text as { plain_text: string }[] | undefined
  const authorArr = props.Author?.rich_text as { plain_text: string }[] | undefined
  const readTimeArr = props.ReadTime?.rich_text as { plain_text: string }[] | undefined
  const publishAt = props.PublishAt?.date as { start: string } | undefined
  const category = props.Category?.select as { name: string } | undefined
  const tag = props.Tag?.select as { name: string } | undefined
  const typeSelect = props.Type?.select as { name: string } | undefined
  return {
    id: page.id as string,
    title: titleArr?.[0]?.plain_text ?? '',
    excerpt: excerptArr?.[0]?.plain_text ?? '',
    content: contentArr?.[0]?.plain_text ?? '',
    category: category?.name ?? '',
    tag: tag?.name ?? '',
    author: authorArr?.[0]?.plain_text ?? 'Alcreon',
    publishAt: publishAt?.start ?? '',
    featured: (props.Featured?.checkbox as boolean) ?? false,
    readTime: readTimeArr?.[0]?.plain_text ?? '5 min',
    type: (typeSelect?.name as 'Editorial' | 'Briefing') ?? 'Editorial',
  }
}

async function queryDB(filter: Record<string, unknown>): Promise<Editorial[]> {
  const now = new Date().toISOString()
  const res = await fetch(`/api/notion/v1/databases/${NOTION_DB_ID}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        and: [
          filter,
          { property: 'PublishAt', date: { on_or_before: now } },
        ],
      },
      sorts: [{ property: 'PublishAt', direction: 'descending' }],
    }),
  })
  if (!res.ok) return []
  const data = await res.json() as { results: Record<string, unknown>[] }
  return (data.results ?? []).map(mapNotionPage)
}

export async function fetchEditorials(): Promise<Editorial[]> {
  return queryDB({ property: 'Type', select: { equals: 'Editorial' } })
}

export async function fetchBriefings(): Promise<Editorial[]> {
  return queryDB({ property: 'Type', select: { equals: 'Briefing' } })
}

export function formatDateUTC(iso: string): string {
  if (!iso) return ''
  return (
    new Date(iso)
      .toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
      })
      .replace(',', '') + ' UTC'
  )
}
