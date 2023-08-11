export function load({ params }) {
    return {
        crossword: params.crossword,
        crossword_id: params.crossword_id,
        solve_group: params.solve_group,
    }
};