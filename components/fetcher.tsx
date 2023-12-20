async function fetcher(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Daten');
    }

    return response.json();
}




export default fetcher;