export interface IProjectBody {
    name: string,
    id? : string
}

export interface IProjectResponse extends IProjectBody {
    slug: string;
    unique_id: string;
    api_count : number
}