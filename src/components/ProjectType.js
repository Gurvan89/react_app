import React from 'react';
import Project from './Project';
import './project.css';

const ProjectType = ({ type, projects }) => {
    return (
        <div className="col-md-4">
            <h1>{type}</h1>
            {projects.map(
                p => <Project key={p.id} properties={p}></Project>
            )}
        </div>
    )
}

export default ProjectType;