import { useState } from "react"
import axios from "axios"

export const useField = type => {
    const [value, setValue] = useState('')

    const onChange = e => setValue(e.target.value)

    return { type, value, onChange}
}

export const useResource = baseUrl => {

    let token = null

    const setToken = newToken => {
        token = `bearer ${newToken}`
    }

    const getAll = async () => {
        const res = await axios.get(baseUrl)
        return res.data
    }

    const create = async newObject => {
        const config = {
            headers: { Authorization: token }
        }

        const res = await axios.post(baseUrl, newObject, config)
        return res.data
    }

    const update = async (id, newObject) => {
        const res = await axios.put(`${ baseUrl }/${id}`, newObject)
        return res.data
    }

    return { getAll, create, update, setToken}
}
