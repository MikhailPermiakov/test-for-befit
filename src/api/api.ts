import {ApiPostInterface} from "@/interfaces-enums/interfaces";

export const api = ()=> {
    return {
        getData: async (postId: number = 0)=>{
            const response = fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId + 1}&id=${postId + 2}&id=${postId + 3}&id=${postId + 4}&id=${postId + 5}`).then((res) => res.json());
            return (response || []) as unknown as ApiPostInterface[]
        }
    }
}
