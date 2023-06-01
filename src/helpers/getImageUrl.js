import axios from "@/axios-interceptors"

export default function getImageUrl(item) {
    return axios.defaults.baseURL + "/products/" + item.slug + "/images/" + item.media[0].filepath
}
