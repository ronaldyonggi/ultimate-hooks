import { useEffect, useState } from "react"
import axios from "axios"

export const useField = type => {
    const [value, setValue] = useState('')

    const onChange = e => setValue(e.target.value)

    return { type, value, onChange}
}

export const useResource = baseUrl => {
    const [resources, setResources] = useState([])

    let token = null

    const setToken = newToken => {
        token = `bearer ${newToken}`
    }

    const getAll = async () => {
        const res = await axios.get(baseUrl)
        setResources(res.data)
        return res.data
    }

    useEffect(() => {
        const fetchAllResources = async () => {
            const fetchedResources = await getAll()
            setResources(fetchedResources)
        }

        fetchAllResources()
    }, [])

    const create = async newObject => {
        const config = {
            headers: { Authorization: token }
        }

        const res = await axios.post(baseUrl, newObject, config)
        setResources(resources.concat(res.data))
        return res.data
    }

    const update = async (id, newObject) => {
        const res = await axios.put(`${ baseUrl }/${id}`, newObject)
        setResources(resources.map(r => r.id === id ? res.data : r))
        return res.data
    }

    return [resources, { getAll, create, update, setToken}]
}
