export async function load({ params }) {
    const serverAddress = `https://csolve.fly.dev/crossword/${params.crossword}/${params.crossword_id}`;
    const serverUpdatesAddress = `https://csolve.fly.dev/solve/${params.crossword}/${params.crossword_id}/${params.solve_group}/get`;
    console.log("fetching initial data for " + params.crossword_id);
    let crossword = await fetchInitialData(serverAddress);
    const answersResponse = await fetchAnswersData(serverUpdatesAddress);
    return {
        crossword: params.crossword,
        crossword_id: params.crossword_id,
        solve_group: params.solve_group,
        networkData: crossword,
        grid: answersResponse,
    }
};

const fetchAnswersData = async (/** @type {RequestInfo | URL} */ serverUpdatesAddress) => {
    try {
        const response = await fetch(serverUpdatesAddress);
        let updatedGrid;
        updatedGrid = await response.json();
        console.log("updatedGrid has height: " + updatedGrid.height);
        return updatedGrid;
    } catch (error) {
        console.error("Error fetching data:", error);
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