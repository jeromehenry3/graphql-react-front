import React, { Component, propTypes } from 'react';
import { Button } from 'semantic-ui-react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import './Events.css';

class EventsPage extends Component {


    render() {
        return (
            <>
                <Backdrop></Backdrop>
                <Modal title="créer un évènement" canCancel canConfirm>{<p>Modal Content</p>}</Modal>
                <div className="create-event_button">
                    <Button>Créer un évènement</Button>
                </div>
            </>
        );
    }
}

EventsPage.propTypes = {

}

export default EventsPage;