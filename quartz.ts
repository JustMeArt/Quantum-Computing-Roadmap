import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { byDateAndAlphabeticalFolderFirst } from "@quartz-community/folder-page/components"
import type { SortFn } from "@quartz-community/types"

// Folders can opt individual notes into a fixed order via an `order:` frontmatter
// field (lower = earlier). Notes without it fall back to the plugin's default
// (date, then alphabetical) so this only affects folders that set it.
const fallbackSort = byDateAndAlphabeticalFolderFirst()
const orderAwareSort: SortFn = (f1, f2) => {
  const o1 = f1.frontmatter?.order as number | undefined
  const o2 = f2.frontmatter?.order as number | undefined
  if (typeof o1 === "number" && typeof o2 === "number") return o1 - o2
  if (typeof o1 === "number") return -1
  if (typeof o2 === "number") return 1
  return fallbackSort(f1, f2)
}
componentRegistry.setOptionOverrides("@quartz-community/folder-page", { sort: orderAwareSort })

// The sidebar Explorer tree is a separate component with its own independent
// sort — same `order` frontmatter field, mirroring the Explorer plugin's own
// default fallback (folders first, then numeric-aware alphabetical) exactly.
interface ExplorerNode {
  isFolder: boolean
  displayName?: string
  data: Record<string, unknown> | null
}
const explorerSortFn = (a: ExplorerNode, b: ExplorerNode): number => {
  const aOrder = (a.data?.frontmatter as Record<string, unknown> | undefined)?.order as
    | number
    | undefined
  const bOrder = (b.data?.frontmatter as Record<string, unknown> | undefined)?.order as
    | number
    | undefined
  if (!a.isFolder && !b.isFolder && typeof aOrder === "number" && typeof bOrder === "number") {
    return aOrder - bOrder
  }
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  return !a.isFolder && b.isFolder ? 1 : -1
}
componentRegistry.setOptionOverrides("@quartz-community/explorer", { sortFn: explorerSortFn })

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
