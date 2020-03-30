import React, { Component } from 'react';
import ProjectGroup from './components/ProjectGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormProject from './components/FormProject';


class App extends Component {
  state = {
    data: "",
    error: '',
  }
  showModal = () => { this.refs.formProject.open() }

  render() {
    return (
      <div className="app">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='push'
            direction='top'
            icon='labeled'
            inverted
            vertical
            visible
            width='thin'
          >
            <Menu.Item as='a' onClick={this.showModal}>
              <Icon name='plus'/>
                Add project
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Jumbotron>
                <Container>
                  <h1>Do it yourself projects</h1>
                </Container>
              </Jumbotron>
              <Container>
                <ProjectGroup></ProjectGroup>
              </Container>
              <FormProject ref="formProject"></FormProject>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    );
  }
}

export default App;