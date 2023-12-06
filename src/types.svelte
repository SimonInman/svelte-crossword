<script context="module" lang="ts">
  import type { CellStyle } from "./api/types.svelte";

  export type Square = {
    isLit: boolean;
    content: string | null;
    clueNumber: number | null | undefined;
    userStyle: CellStyle | null;
    hasRightBar: boolean;
    hasBottomBar: boolean;
  };
</script>
