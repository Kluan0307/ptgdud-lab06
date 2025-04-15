import React from "react";
import teams from '../assets/img/Groups.png'

function Teams() {
    return(
        <div className="flex justify-center items-center p-30">
            <img src={teams} alt="projects-img" className="w-20 h-20"/>
            <h1 className="text-black ml-10 font-bold">Teams</h1>
        </div>
    )
}

export default Teams;