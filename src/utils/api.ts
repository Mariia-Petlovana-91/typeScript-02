import axios from "axios";
import KEY_API from "./apiId";
import { UnsplashImage } from "../types";

const BASE_URL:string = 'https://api.unsplash.com/search/photos';
const PER_PAGE:number = 12;


interface UnsplashResponse {
    total: number;
    total_pages: number;
    results: UnsplashImage[];
}

export default async function getDataImages<T = UnsplashResponse>(
    searchValue: string,
    nextPage: number
): Promise<T> {
    try {
        const response = await axios.get<T>(`${BASE_URL}`, {
            params: {
                query: searchValue,
                per_page: PER_PAGE,
                page: nextPage,
            },
            headers: {
                Authorization: `Client-ID ${KEY_API}`,
            },
        });
        return response.data;
    } catch (error: unknown ) {
        throw error;
    }
}