export interface IFieldColumns {
    fieldName: string,
    fieldType: string,
    fieldCheckbox: string
}

export interface ICreateApiBody {
    title: string;
    project_id: string;
    columns: Array<{ title: { [key: string]: number }, required: 0 | 1 }>
}