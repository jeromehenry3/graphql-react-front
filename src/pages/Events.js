import React, { Component } from 'react';
import { Button, Form, TextArea, Input } from 'semantic-ui-react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import './Events.css';

class EventsPage extends Component {
    state = {
        creating: false,
    }

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    handleCreateEventButton = () => {
        this.setState({ creating: true });
    }

    handleCancelInModal = () => {
        this.setState({ creating: false });
    }

    handleConfirmInModal = () => {
        this.setState({ creating: false });

        const title = this.titleElRef.inputRef.current.value;
        const price = this.priceElRef.inputRef.current.value;
        const date = this.dateElRef.inputRef.current.value;
        const description = this.descriptionElRef.ref.current.value;

        if (
            title.trim().length === 0 ||
            price.trim().length === 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) { return; }

        const event = { title, price, date, description };
        console.table(event);
        console.log(title);
    }

    render() {
        return (
            <>
                {this.state.creating && 
                <>
                    <Backdrop></Backdrop>
                    <Modal
                        title="créer un évènement"
                        canCancel={this.handleCancelInModal}
                        canConfirm={this.handleConfirmInModal}
                    >
                        <Form>
                            <Form.Field>
                                <label>titre</label>
                                <Input placeholder="titre de l'évènement" ref={ref => this.titleElRef = ref}></Input>
                            </Form.Field>
                            <Form.Field>
                                <label>prix (€)</label>
                                <Input
                                    type="number"
                                    placeholder="tarif de l'évènement"
                                    ref={ref => this.priceElRef = ref}
                                ></Input>                                
                            </Form.Field>
                            <Form.Field>
                                <label>date</label>
                                <Input type="date" ref={ref => this.dateElRef = ref}></Input>
                            </Form.Field>
                            <Form.Field>
                                <label>description</label>
                                <TextArea
                                    placeholder="description de l'évènement"
                                    ref={ref => this.descriptionElRef = ref}
                                ></TextArea>
                            </Form.Field>
                        </Form>
                    </Modal>
                </>}
                <div className="create-event_button">
                    <Button onClick={this.handleCreateEventButton}>Créer un évènement</Button>
                </div>
            </>
        );
    }
}

export default EventsPage;