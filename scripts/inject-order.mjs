// Patches an `order` field onto contentIndex.json entries, read straight from
// each note's `order:` frontmatter. Needed because contentIndex.json's schema
// (slug/filePath/title/links/tags/content/date/description) has no frontmatter
// passthrough, so the client-side Explorer sidebar can't otherwise see it.
import { readFileSync, writeFileSync, existsSync } from "fs"
import path from "path"

const contentIndexPath = path.resolve("public/static/contentIndex.json")
const contentDir = path.resolve("content")

const raw = JSON.parse(readFileSync(contentIndexPath, "utf-8"))
const entries = raw.content ?? raw

const frontmatterOrderCache = new Map()
function getOrder(filePath) {
  if (frontmatterOrderCache.has(filePath)) return frontmatterOrderCache.get(filePath)
  const fullPath = path.join(contentDir, filePath)
  let order
  if (existsSync(fullPath)) {
    const text = readFileSync(fullPath, "utf-8")
    const match = text.match(/^---\n([\s\S]*?)\n---/)
    if (match) {
      const orderMatch = match[1].match(/^order:\s*(\d+)\s*$/m)
      if (orderMatch) order = Number(orderMatch[1])
    }
  }
  frontmatterOrderCache.set(filePath, order)
  return order
}

let patched = 0
for (const entry of Object.values(entries)) {
  if (!entry.filePath) continue
  const order = getOrder(entry.filePath)
  if (typeof order === "number") {
    entry.order = order
    patched++
  }
}

writeFileSync(contentIndexPath, JSON.stringify(raw))
console.log(`[inject-order] Patched ${patched} entries with an order field.`)
