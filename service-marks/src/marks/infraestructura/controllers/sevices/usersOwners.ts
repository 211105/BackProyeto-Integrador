import { RowDataPacket } from "mysql2";

export async function fetchUserOwners(userUuids: any[]): Promise<any> {
    const rows = userUuids as RowDataPacket[];
    const uuids = rows.map(pin => pin.user_uuid);
    console.log("desde el fetch", userUuids)
    console.log(userUuids)
    const url = "https://allgate.cristilex.com/api/v1/users/owners/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYTdjZTM0MDMtYjY2NS00MjFhLTk2OWYtYTFmZWM3NDJiM2E2IiwiZW1haWwiOiJtYXJpYUBnbWFpbC5jb20iLCJpYXQiOjE3MDE4NTA4NjAsImV4cCI6MTcwMjExNzI2MH0.Zl7NTEl8MpeFzznfLnlK-G_JPUlFObKeHehuNvxkfnk";

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({uuids}),
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