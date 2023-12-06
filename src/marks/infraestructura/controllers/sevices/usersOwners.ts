
export async function fetchUserOwners(uuids: string[]): Promise<any> {
    const url = "https://allgate.cristilex.com/api/v1/users/owners/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWVmMzhiZmItYTBmZS00OGE3LTkxNWEtMzkyZTI4MTQ0ZDE1IiwiZW1haWwiOiJtYXJpYUBnbWFpbC5jb20iLCJpYXQiOjE3MDE1MDAwODksImV4cCI6MTcwMTc2NjQ4OX0.EcMU1AANOMlciWMsUnu2eg1qF_uFyludx2Mu6-Mtoxc";

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: headers,
        body: JSON.stringify({ uuids }),
        redirect: 'follow' // Ajuste aquí
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching user owners:', error);
        throw error;
    }
}