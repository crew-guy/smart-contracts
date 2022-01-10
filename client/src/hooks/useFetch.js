import { useEffect, useState } from "react"

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

export const useFetch = (keyword) => {
    const [gifUrl, setGifUrl] = useState("")

    useEffect(() => {
        try {
            let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=1`)
            if(!response.data.length) response = await fetch(`api.giphy.com/v1/gifs/random?api_key=${API_KEY}&limit=1`) 
            setGifUrl(response.data[0].url)
        } catch (error) {
            console.error(error)
        }

    })
}