export enum VisibleEnum {
    LOCAL = 'LOCAL',
    YES = 'YES',
    NO = 'NO',
}

export interface ApiPostInterface {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface PostInterface extends ApiPostInterface {
    isVisible: VisibleEnum;
}

export interface ListsInterface {
    local: PostInterface[];
    yes: PostInterface[];
    no: PostInterface[];
}
