export interface IFieldColumns {
    fieldName: string;
    fieldType: string;
    fieldCheckbox: string;
}

export interface IFieldValueColumns extends IFieldColumns {
    value: string;
    title: string;
    required: boolean;
}

export interface IApiSettings {
    column_id: number;
    title: string;
    required: number;
}

export interface ICreateApiBody {
    title: string;
    project_id: string;
    columns: Array<{ title: { [key: string]: number }, required: 0 | 1 }>
}
