import React, { Component } from 'react'
import {
    Button,
    Form,
    Input,
    Radio,
    TextArea,
    Modal
} from 'semantic-ui-react'
import PubSub from 'pubsub-js';
import MessagePortal from './MessagePortal';

/**
* Url to insert or update project
*/
const API_INSERT = "http://192.168.2.5:8080/api/project/edit";

class FormProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: 1,
            open: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e, { value }) => this.setState({ type: value })

    handleDuration = (e, { value }) => this.setState({ duration: value })

    close = () => this.setState({ open: false })

    open = () => this.setState({ open: true })

    handleSubmit(event) {
        event.preventDefault();
        const { type } = this.state;
        const data = new FormData(event.target);
        let project = {
            "name": data.get('name'),
            "type": type,
            "estimatedDuration": parseInt(data.get('duration')),
            "equipments": {},
            "description": data.get('description')
        };

        fetch(API_INSERT, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: { 'Content-Type': "application/json" },
        }).then((result) => {
            let projectName = project.name;
            if (result.status == 200) {
                this.setState({
                    messagePortal: `Project named "${projectName}" updated with success`,
                    headerPortal: "Success",
                    data: null,
                    render: false
                })
            }else if(result.status == 201){
                this.setState({
                    messagePortal: `Project named "${projectName}" created with success`,
                    headerPortal: "Success",
                    data: null,
                    render: false
                })
            } else {
                this.setState({
                    messagePortal: `Something went wrong during edit of this project : ${projectName}`,
                    headerPortal: "Error"
                })
            }
            this.refs.msgPortal.handleOpen();
        });
        PubSub.publish('UPDATE_PROJECT_LIST', project);
        this.close();
    }

    render() {
        const { type, duration, open,messagePortal,headerPortal } = this.state;
        return (
            <div>
                <MessagePortal ref="msgPortal" header={headerPortal} message={messagePortal} ></MessagePortal>
                <Modal
                    open={open}
                    basic
                    size="small"
                    onClose={this.close}
                    closeIcon>

                    <Modal.Header>Add a new project</Modal.Header>
                    <Modal.Content>
                        <Form inverted onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='Project name'
                                    name='name'
                                    placeholder='The name of your project?'
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={TextArea}
                                    label="Project's description"
                                    name='description'
                                    placeholder='Tell us more about your idea...'
                                />
                            </Form.Group>

                            <Form.Group inline name="type">
                                <label>Project's type</label>
                                <Form.Field
                                    control={Radio}
                                    label='Sewing'
                                    value='SEWING'
                                    checked={type === 'SEWING'}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Knitting'
                                    value='KNITTING'
                                    checked={type === 'KNITTING'}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Crochet'
                                    value='CROCHET'
                                    checked={type === 'CROCHET'}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Input
                                label={`Duration: ${duration} day(s) `}
                                min={1}
                                max={200}
                                name='duration'
                                onChange={this.handleDuration}
                                step={1}
                                type='range'
                                value={duration}
                            />
                            <Button type='submit'>Save</Button>

                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default FormProject