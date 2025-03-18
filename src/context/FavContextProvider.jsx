/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client";
import FavContext from "./FavContext";


export default function FavContextProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [fav, setFav] = useState([]);

    const readFav = async () => {
        let { data: favourites, error } = await supabase
            .from("favourites")
            .select("*")
            .eq("profile_id", session.user.id);
        
        if (error) {
            console.log(error);
        } else {
            setFav(favourites);
        }
    };

    useEffect(() => {
        if (session) {
            readFav();
        }
    }, [session]);

    return (
        <FavContext.Provider value={{ fav, setFav }}>
            {children}
        </FavContext.Provider>
    );
}