export enum StatusEnum {
    GENERAL = 'GENERAL',
    LIKE = 'LIKE',
    DISLIKE = 'DISLIKE',
}

export interface ApiPostInterface {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface ListsInterface {
    general: ApiPostInterface[];
    like: ApiPostInterface[];
    dislike: ApiPostInterface[];
}

export interface IdStatusInterface {
    id: number;
    status: StatusEnum;
}
