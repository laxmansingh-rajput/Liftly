import { useState, useEffect } from "react";

export const usePath = () => {
    const [path, setpath] = useState("")
    const [alterPaths, setalterPaths] = useState([])
    const [pathIndex, setpathIndex] = useState(0)
    return {
        path, setpath, alterPaths, setalterPaths, pathIndex, setpathIndex
    }
}