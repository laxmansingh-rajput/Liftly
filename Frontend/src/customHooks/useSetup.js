import { useState, useEffect } from "react";
import { getLocation } from '../controller/getlocation.js'

export const useSetup = () => {
    const [showBar, setshowBar] = useState(false)
    const [suggetions, setsuggetions] = useState([])
    const [field, setfield] = useState(0)
    const [showButton, setshowButton] = useState(true)
    const [select, setselect] = useState(false)
    const [center, setcenter] = useState(null)
    const [coordinates, setcoordinates] = useState(center)
    useEffect(() => {
        const createCenter = async () => {
            let location = await getLocation()
            if (location) {
                setcenter(location)
                setcoordinates(location)
            }
        }
        createCenter()
    }, [])


    useEffect(() => {
        if (location.source != 'Medicaps University') {
            setshowButton(true)
        } else {
            setshowButton(false)
        }
    }, [location])
    return {
        showBar, setshowBar, center, setcenter,
        suggetions, setsuggetions, select, setselect,
        field, setfield,
        showButton, setshowButton,
        coordinates, setcoordinates
    }
}