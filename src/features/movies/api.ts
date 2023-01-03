import queryString from "query-string";
import {API_KEY} from "./../../app/constants";
import axios from "axios";

export function fetchMovies(search:string,page:number) {
    const url = `http://omdbapi.com/?${queryString.stringify({s:search, apikey:API_KEY, page:page})}`
    return axios.get(url);
}

export function fetchMovie(id:string) {
    const url = `http://omdbapi.com/?${queryString.stringify({i:id,apikey:API_KEY})}`
    return axios.get(url);
}