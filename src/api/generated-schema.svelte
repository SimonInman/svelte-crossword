<script context="module" lang="ts">
    export interface paths {
        "/crossword/{source}/{id}": {
            /** Get a crossword from the store */
            get: operations["get_crossword"];
        };
        "/dummy_crossword_with_styles": {
            /** Get a dummy crossword from the store. Only here at the moment so the Crossword with styled cells type gets generated in the openapi file */
            get: operations["get_crossword_dummy"];
        };
        "/crossword/{source}/{id}/pdf": {
            /** Get a pdf version of a crossword from the store */
            get: operations["get_crossword_pdf"];
        };
        "/suggestions/{source}": {
            /** Get suggestions for a given crossword from the store */
            get: operations["get_crossword_suggestions"];
        };
        "/solve/{source}/{id}/{group}/get": {
            /** Get or start a new solve */
            get: operations["get_or_init_solve"];
        };
        "/solve/{source}/{id}/{group}/set_cell": {
            /** Set a cell value in a given solve */
            post: operations["set_cell_in_solve"];
        };
    }

    export interface components {
        schemas: {
            /** @description A generic crossword */
            Crossword_for_CellValue: {
                /** @description The grid */
                grid: components["schemas"]["Grid_for_CellValue"];
                /** @description The clues */
                clues: components["schemas"]["Clues"];
                /** @description Notes */
                notes?: string | null;
                /** @description The meta information */
                meta: components["schemas"]["Meta"];
            };
            /** @description The grid of a crossword */
            Grid_for_CellValue: {
                /**
                 * Format: uint16
                 * @description The width of the grid
                 */
                width: number;
                /**
                 * Format: uint16
                 * @description The height of the grid
                 */
                height: number;
                /** @description The cells of the grid */
                cells: components["schemas"]["Cell_for_CellValue"][][];
            };
            /** @description A cell */
            Cell_for_CellValue: {
                /**
                 * Format: uint16
                 * @description The number clue the cells starts, if any
                 */
                number?: number | null;
                /** @description The value of the cell */
                value: components["schemas"]["CellValue"];
                /**
                 * @description Whether the cell is shaded or not
                 * @default false
                 */
                is_shaded?: boolean;
                /**
                 * @description Whether the cell is a circle or not
                 * @default false
                 */
                is_circle?: boolean;
                /**
                 * @description Whether the cells ends an across clue
                 * @default null
                 */
                across_word_end?: components["schemas"]["WordEnder"] | null;
                /**
                 * @description Whether the cells ends an down clue
                 * @default null
                 */
                down_word_end?: components["schemas"]["WordEnder"] | null;
                /**
                 * @description Whether the cell has a bar to the right
                 * @default false
                 */
                has_right_bar?: boolean;
                /**
                 * @description Whether the cell has a bar to the bottom
                 * @default false
                 */
                has_bottom_bar?: boolean;
            };
            /** @description The state of a cell */
            CellValue:
                | ("Closed" | "Open")
                | {
                      Char: {
                          /** @description The value which is in the cell */
                          value: string;
                      };
                  };
            /**
             * @description Something which can end a word
             * @enum {string}
             */
            WordEnder: "Space" | "Hyphen" | "Ratio";
            /** @description A list of all clues */
            Clues: {
                /** @description The across clues */
                across: components["schemas"]["Clue"][];
                /** @description The down clues */
                down: components["schemas"]["Clue"][];
            };
            /** @description A clue in the crossword */
            Clue: {
                /**
                 * Format: uint16
                 * @description The number
                 */
                number: number;
                /** @description The surface */
                surface: string;
                /**
                 * Format: uint16
                 * @description The length of the clue
                 */
                length: number;
                /** @description The answer (optional) */
                answer?: string | null;
                /** @description The position the clue starts at */
                position: components["schemas"]["Position"];
                /** @description The span of the clue */
                span_info: components["schemas"]["ClueSpanInfo"];
            };
            /** @description A position within a grid */
            Position: {
                /**
                 * Format: uint16
                 * @description The row
                 */
                row: number;
                /**
                 * Format: uint16
                 * @description The column
                 */
                column: number;
            };
            /** @description Information about the span of a clue */
            ClueSpanInfo: {
                /** @description The immediate linear span of the clue */
                linear_span: components["schemas"]["Position"][];
                /** @description The full span of the clue */
                full_span: components["schemas"]["Position"][];
                /** @description The clue spans which come before this one */
                overflow_clues: components["schemas"]["CluePointer"][];
                /** @description The clue spans which come after this one */
                underflow_clues: components["schemas"]["CluePointer"][];
            };
            /** @description A pointer to a clue */
            CluePointer: {
                /** @description The direction of the clue */
                direction: components["schemas"]["Direction"];
                /**
                 * Format: uint16
                 * @description The number of the clue
                 */
                number: number;
            };
            /**
             * @description A direction
             * @enum {string}
             */
            Direction: "Across" | "Down";
            /** @description Meta information about a crossword */
            Meta: {
                /** @description The setter of the puzzle */
                setter?: string | null;
                /** @description The id of the puzzle */
                id?: string | null;
                /** @description The source of the puzzle */
                source?: string | null;
            };
            /**
             * @description The source of a crossword
             * @enum {string}
             */
            Source:
                | "guardian-cryptic"
                | "guardian-prize"
                | "guardian-quiptic"
                | "guardian-everyman"
                | "guardian-azed"
                | "guardian-american-style"
                | "my-crossword"
                | "n-y-t"
                | "f-t"
                | "washington-post"
                | "new-yorker"
                | "the-hindu"
                | "el-pais"
                | "private-eye"
                | "independent"
                | "independent-on-sunday"
                | "viz"
                | "misc";
            /** @description A generic crossword */
            Crossword_for_StyledCellValue: {
                /** @description The grid */
                grid: components["schemas"]["Grid_for_StyledCellValue"];
                /** @description The clues */
                clues: components["schemas"]["Clues"];
                /** @description Notes */
                notes?: string | null;
                /** @description The meta information */
                meta: components["schemas"]["Meta"];
            };
            /** @description The grid of a crossword */
            Grid_for_StyledCellValue: {
                /**
                 * Format: uint16
                 * @description The width of the grid
                 */
                width: number;
                /**
                 * Format: uint16
                 * @description The height of the grid
                 */
                height: number;
                /** @description The cells of the grid */
                cells: components["schemas"]["Cell_for_StyledCellValue"][][];
            };
            /** @description A cell */
            Cell_for_StyledCellValue: {
                /**
                 * Format: uint16
                 * @description The number clue the cells starts, if any
                 */
                number?: number | null;
                /** @description The value of the cell */
                value: components["schemas"]["StyledCellValue"];
                /**
                 * @description Whether the cell is shaded or not
                 * @default false
                 */
                is_shaded?: boolean;
                /**
                 * @description Whether the cell is a circle or not
                 * @default false
                 */
                is_circle?: boolean;
                /**
                 * @description Whether the cells ends an across clue
                 * @default null
                 */
                across_word_end?: components["schemas"]["WordEnder"] | null;
                /**
                 * @description Whether the cells ends an down clue
                 * @default null
                 */
                down_word_end?: components["schemas"]["WordEnder"] | null;
                /**
                 * @description Whether the cell has a bar to the right
                 * @default false
                 */
                has_right_bar?: boolean;
                /**
                 * @description Whether the cell has a bar to the bottom
                 * @default false
                 */
                has_bottom_bar?: boolean;
            };
            /** @description The state of a cell */
            StyledCellValue:
                | ("Closed" | "Open")
                | {
                      FilledChar: {
                          /** @description The value which is in the cell */
                          value: string;
                          /** @description Style */
                          style?: components["schemas"]["CellStyle"] | null;
                      };
                  };
            /** @description The style of a cell */
            CellStyle: {
                /** @description The colour of the celll */
                colour: components["schemas"]["Colour"];
                /** @description The pattern of the cell */
                pattern: components["schemas"]["Pattern"];
            };
            /** @description A colour */
            Colour: {
                /**
                 * Format: uint8
                 * @description The red portion of the colour
                 */
                red: number;
                /**
                 * Format: uint8
                 * @description The green portion of the colour
                 */
                green: number;
                /**
                 * Format: uint8
                 * @description The blue portion of the colour
                 */
                blue: number;
            };
            /**
             * @description A pattern
             * @enum {string}
             */
            Pattern:
                | "Block"
                | "DiagonalStripes"
                | "VerticalStripes"
                | "HorizontalStripes"
                | "Circles";
            /** @description Suggestions of what crossword the user might like to do The ID required to fetch it along with a human-readable tag (such as "today") */
            Suggestion: {
                /** @description The id required to fetch a puzzle */
                id: string;
                /** @description Human-readable tag (such as "today") */
                helpful_tag: string;
            };
            SetCell: {
                /** Format: uint */
                row: number;
                /** Format: uint */
                col: number;
                value: components["schemas"]["StyledCellValue"];
            };
        };
    }

    export interface operations {
        /** Get a crossword from the store */
        get_crossword: {
            parameters: {
                path: {
                    source: components["schemas"]["Source"];
                    id: string;
                };
            };
            responses: {
                200: {
                    content: {
                        "application/json": components["schemas"]["Crossword_for_CellValue"];
                    };
                };
                400: {
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        /** Get a dummy crossword from the store. Only here at the moment so the Crossword with styled cells type gets generated in the openapi file */
        get_crossword_dummy: {
            responses: {
                200: {
                    content: {
                        "application/json": components["schemas"]["Crossword_for_StyledCellValue"];
                    };
                };
                404: unknown;
            };
        };
        /** Get a pdf version of a crossword from the store */
        get_crossword_pdf: {
            parameters: {
                path: {
                    source: components["schemas"]["Source"];
                    id: string;
                };
            };
            responses: {
                200: {
                    content: {
                        "application/pdf": number[];
                    };
                };
                400: {
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        /** Get suggestions for a given crossword from the store */
        get_crossword_suggestions: {
            parameters: {
                path: {
                    source: components["schemas"]["Source"];
                };
            };
            responses: {
                200: {
                    content: {
                        "application/json": components["schemas"]["Suggestion"][];
                    };
                };
                400: {
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        /** Get or start a new solve */
        get_or_init_solve: {
            parameters: {
                path: {
                    source: components["schemas"]["Source"];
                    id: string;
                    group: string;
                };
            };
            responses: {
                200: {
                    content: {
                        "application/json": components["schemas"]["Grid_for_StyledCellValue"];
                    };
                };
                400: {
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        /** Set a cell value in a given solve */
        set_cell_in_solve: {
            parameters: {
                path: {
                    source: components["schemas"]["Source"];
                    id: string;
                    group: string;
                };
            };
            responses: {
                200: {
                    content: {
                        "application/json": unknown;
                    };
                };
                400: {
                    content: {
                        "application/json": unknown;
                    };
                };
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["SetCell"];
                };
            };
        };
    }

    export interface external {}
</script>

/** * This file was auto-generated by openapi-typescript. * Do not make direct
changes to the file. */
