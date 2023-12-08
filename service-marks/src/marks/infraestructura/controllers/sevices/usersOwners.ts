import { RowDataPacket } from "mysql2";

export async function fetchUserOwners(userUuids: any[], token: string | undefined): Promise<any> {
     try {
    if (!token) {
        throw Error("No hay token ")
    }
    
    const rows = userUuids as RowDataPacket[];
    const uuids = rows.map(pin => pin.user_uuid);
    const url = "http://localhost:3000/api/v1/users/owners/";
   
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({uuids}),
        redirect: 'follow' // Ajuste aquí
    };

   
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching user owners:', error);
        throw error;
    }
}