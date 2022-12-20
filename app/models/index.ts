export interface IResponse<Type> {
    code: number,
    data: Type,
    response: string
}