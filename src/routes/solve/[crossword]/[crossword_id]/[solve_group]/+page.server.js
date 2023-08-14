export async function load({ params }) {
    const serverAddress = `https://csolve.fly.dev/crossword/${params.crossword}/${params.crossword_id}`;
    console.log("fetching initial data for " + params.crossword_id);
    let crossword = await fetchInitialData(serverAddress);
    return {
        crossword: params.crossword,
        crossword_id: params.crossword_id,
        solve_group: params.solve_group,
        networkData: crossword,
    }
};

const fetchInitialData = async (/** @type {RequestInfo | URL} */ serverAddress) => {
    try {
        // Fetch data from the server (replace "YOUR_SERVER_ADDRESS" with the actual server URL)
        const response = await fetch(serverAddress);
        let networkData = await response.json();
        console.log("fetched: " + response.body);
        // networkGrid = networkData.grid;
        // networkClues = networkData.clues;
        return networkData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};