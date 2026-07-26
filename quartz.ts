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

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
