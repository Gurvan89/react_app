import React, { Component } from 'react'
import { Grid, Header, Segment, TransitionablePortal } from 'semantic-ui-react'

export default class MessagePortal extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleClose = () => this.setState({ open: false })
    handleOpen = () => {
        this.setState({ open: true });
        setTimeout(this.handleClose, 4000);
    }

    render() {
        const { header, message } = this.props;
        const { open } = this.state;
        let errorColor = header != "Error" ? false : true;
        return (
            <Grid columns={2}>
                <Grid.Column>
                    <TransitionablePortal onClose={this.handleClose} open={open} animation>
                        <Segment
                            style={{
                                right: '2%',
                                top: '2%',
                                position: 'fixed',
                                zIndex: 1000,
                                backgroundColor: "#354555",
                            }}
                        >
                            <Header style={{ color: errorColor ? "red" : "green" }}>{header}</Header>
                            <p>{message}</p>
                        </Segment>
                    </TransitionablePortal>
                </Grid.Column>
            </Grid>
        )
    }
}

