export type ChartType = "line" | "area" | "bar" | "pie" | "donut";

export type ResponseType <T = any> ={
    status_code: number;
    message: string;
    meta?: PageQueryType;
    data?: T;
    dev?: any;
}

export interface filterType extends PageQueryType  {
    genres?: string;
    adult?: boolean;
    start_date?: Date;
    end_date?: Date;
}

export type PageQueryType = {
    search?: string;
    sort?: string;
    per_page?: number;
    page?: number;
    last_page?: number;
    total_data?: number;
}

export type chartDataType = {
    labels : string[],
    series : number[],
    total? : number
}

export type MovieType = {
    id: number;
    title: string;
    release_date: Date;
    genres: GenreType[];
    overview: string;
    languages:string;
    adult: number
    vote_average: number;
    vote_count: number
    img?: string
}

export type GenreType = {
    id: number;
    name: string;
}

export type SelectType = {
    label: string;
    value: string;
}


export type responseGetAllMovies = {
    meta : PageQueryType;
    data : MovieType[]
}

export type DeleteResponse = {
    id:number
}


export interface responseGetAnalyticsByGenres extends ResponseType {
    top_member? : string[]
}