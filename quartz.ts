import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { byDateAndAlphabeticalFolderFirst } from "@quartz-community/folder-page/components"
import type { SortFn } from "@quartz-community/types"
import { h } from "preact"
import type { ImageOptions, UserOpts } from "@quartz-community/og-image"

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

// The sidebar Explorer tree is a separate, client-side component that reads
// from the built contentIndex.json at runtime — a fixed, flat schema
// (slug/filePath/title/links/tags/content/date/description) with no
// `frontmatter` passthrough, so it can't see the `order` field above at all.
// scripts/inject-order.mjs patches an `order` field onto that JSON directly
// after build (see package.json's postbuild script), which is what this reads.
interface ExplorerNode {
  isFolder: boolean
  displayName?: string
  data: Record<string, unknown> | null
}
const explorerSortFn = (a: ExplorerNode, b: ExplorerNode): number => {
  const aOrder = a.data?.order as number | undefined
  const bOrder = b.data?.order as number | undefined
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

// Social share cards (og:image) default to title + description + date/tags footer.
// The description line was dropped here by request — it duplicated the meta
// description and read as clutter next to the big title. `cfg.theme` comes back
// typed as `unknown` from @quartz-community/types (same as inside the plugin
// itself), so it's cast locally to the shape the theme config actually has.
const titleOnlySocialImage = (opts: ImageOptions & { userOpts: UserOpts; iconBase64?: string }) => {
  const { cfg, userOpts, title, iconBase64 } = opts
  const theme = cfg.theme as {
    typography: { header: string | { name: string }; body: string | { name: string } }
    colors: Record<UserOpts["colorScheme"], { light: string; dark: string; gray: string }>
  }
  const colors = theme.colors[userOpts.colorScheme]
  const fontName = (spec: string | { name: string }) =>
    typeof spec === "string" ? spec : spec.name
  const useSmallerFont = title.length > 32

  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: colors.light,
        padding: "3rem",
        fontFamily: fontName(theme.typography.body),
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" } },
      iconBase64
        ? h("img", {
            src: iconBase64,
            alt: "",
            width: 56,
            height: 56,
            style: { borderRadius: "50%" },
          })
        : null,
      h("div", { style: { display: "flex", fontSize: 32, color: colors.gray } }, cfg.baseUrl),
    ),
    h(
      "h1",
      {
        style: {
          margin: 0,
          fontSize: useSmallerFont ? 72 : 84,
          fontFamily: fontName(theme.typography.header),
          fontWeight: 700,
          color: colors.dark,
          lineHeight: 1.2,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
      title,
    ),
  )
}
componentRegistry.setOptionOverrides("@quartz-community/og-image", {
  imageStructure: titleOnlySocialImage,
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
