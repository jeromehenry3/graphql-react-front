import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import './Events.css';

class EventsPage extends Component {
    state = {
        creating: false,
    }

    handleCreateEventButton = () => {
        this.setState({creating: true});
    }

    handleCancelInModal = () => {
        this.setState({creating: false});
    }

    render() {
        return (
            <>
                {this.state.creating && 
                <>
                    <Backdrop></Backdrop>
                    <Modal title="créer un évènement" canCancel={this.handleCancelInModal} canConfirm={this.handleCancelInModal}>{<p>Modal Content</p>}</Modal>
                </>}
                <div className="create-event_button">
                    <Button onClick={this.handleCreateEventButton}>Créer un évènement</Button>
                </div>
            </>
        );
    }
}

export default EventsPage;