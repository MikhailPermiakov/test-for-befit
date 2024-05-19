import {ApiPostInterface} from "@/interfaces-enums/interfaces-enums";

const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
if (!VUE_APP_API_URL) {
    throw new Error('please set VUE_APP_API_URL');
}

export const api = ()=> {
    return {
        getData: async ()=>{
            const response = fetch(`${VUE_APP_API_URL}/posts`).then((res) => res.json());
            return (response || []) as unknown as ApiPostInterface[]
        }
    }
}
