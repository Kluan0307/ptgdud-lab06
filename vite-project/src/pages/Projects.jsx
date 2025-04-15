import React from "react";
import projects from '../assets/img/Folder.png'

function Projects() {
    return(
        <div className="flex justify-center items-center p-30">
            <img src={projects} alt="projects-img" className="w-20 h-20"/>
            <h1 className="text-black ml-5 font-bold">Projects</h1>
        </div>
    )
}

export default Projects;