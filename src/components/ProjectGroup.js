import React from 'react';
import ProjectType from './ProjectType';
import { Card } from 'semantic-ui-react';
import PubSub from 'pubsub-js'

/**
* Url to get all projects
*/
const API_GET_ALL = "http://192.168.2.5:8080/api/project/all";

/**
 * Options to get all project
 */
const REQUEST_OPTIONS = { method: 'GET' };


class ProjectGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
        };

        PubSub.subscribe('UPDATE_PROJECT_LIST', this.updateComponent);
    }

    // or when using CommonJS
    updateComponent = (msg, data) => {
        const {type}=data;
        this.state.data[type].push(data);
        this.forceUpdate();
    };

    componentDidMount() {
        let dataByType = [];
        fetch(API_GET_ALL, REQUEST_OPTIONS)
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach((r) => {
                        if (!Array.isArray(dataByType[r.type]))
                            dataByType[r.type] = [];
                        dataByType[r.type].push(r);
                    });
                    this.setState({
                        isLoaded: true,
                        data: dataByType
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            let projectType = [];
            for (let key in data)
                projectType.push(<ProjectType key={key} type={key} projects={data[key]}></ProjectType>)
            return (
                <Card.Group>
                    {projectType}
                </Card.Group>
            );
        }
    }
}

export default ProjectGroup;