<script context="module" lang="ts">
    import type { components } from "./generated-schema.svelte";

    export type Suggestion = components["schemas"]["Suggestion"];
    export type StyledCellValue = components["schemas"]["StyledCellValue"];
    export type SetCell = components["schemas"]["SetCell"];
    export type Grid = components["schemas"]["Grid_for_StyledCellValue"];
    export type CellStyle = components["schemas"]["CellStyle"];
    export type CellForStyledCellValue =
        components["schemas"]["Cell_for_StyledCellValue"];
    export type CrosswordForStyledCellValue =
        components["schemas"]["Crossword_for_StyledCellValue"];
    export type Clue = components["schemas"]["Clue"];
    export type Colour = components["schemas"]["Colour"];
    export type Pattern = components["schemas"]["Pattern"];
</script>
