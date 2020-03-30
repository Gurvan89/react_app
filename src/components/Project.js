import React from 'react';
import { Card, Confirm, Transition } from 'semantic-ui-react';
import './project.css';
import MessagePortal from './MessagePortal';

/**
 * Api to remove project
 */
const API_REMOVE_PROJECT = "http://192.168.2.5:8080/api/project/remove/";

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: props.properties,
            render: true,
            openConfirmMessage: false,
            messagePortal: false
        };
    }

    triggerModal = (event) => {
        alert("dev in progress");
    }

    interactConfirm = (open = true) => {
        this.setState({ openConfirmMessage: open });
    }

    deleteProject = () => {
        const { id } = this.state.data;
        fetch(API_REMOVE_PROJECT.concat(id), {
            method: 'GET',
            headers: { 'Content-Type': "application/json" },
        }).then(
            (result) => {
                let projectName = this.state.data.name;
                if (result.status == 200) {
                    this.setState({
                        messagePortal: `Project named "${projectName}" deleted with success`,
                        headerPortal: "Success",
                        data: null,
                        render: false
                    })
                }
                else {
                    this.setState({
                        messagePortal: `Something went wrong during removal for this project : ${projectName}`,
                        headerPortal: "Error"
                    })
                }
                this.refs.msgPortal.handleOpen();
                this.interactConfirm(false);
            },
        );
    }

    render() {
        const { openConfirmMessage, messagePortal, headerPortal } = this.state;
        if (!this.state.render) return <MessagePortal ref="msgPortal" header={headerPortal} message={messagePortal} ></MessagePortal>;
        const { name, description, type, estimatedDuration } = this.state.data;
        return (
            <div>
                <MessagePortal ref="msgPortal" header={headerPortal} message={messagePortal} ></MessagePortal>
                <Confirm
                    open={openConfirmMessage}
                    content='Are you sure to delete this project?'
                    onCancel={() => this.interactConfirm(false)}
                    onConfirm={this.deleteProject} />
                <div className="project">
                    <div>
                        <Card>
                            <Card.Content>
                                <Card.Header style={{ color: "#ffb300" }}>{name.charAt(0).toUpperCase()}{name.slice(1).toLowerCase()}</Card.Header>
                                {description ?
                                    <Card.Description>{description}</Card.Description>
                                    : undefined}
                                <Card.Meta>Type: {type} </Card.Meta>
                                <Card.Meta>Estimated duration: {estimatedDuration} </Card.Meta>
                                <div>
                                    <i aria-hidden="true" className="pencil link icon" onClick={this.triggerModal}></i>
                                    <i aria-hidden="true" className="trash alternate outline link icon" onClick={() => this.interactConfirm(true)}></i>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Project;