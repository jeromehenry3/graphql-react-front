import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button, Form, TextArea, Input } from 'semantic-ui-react';
import AuthContext from '../context/auth-context';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import './Events.css';

class EventsPage extends Component {
    state = {
        creating: false,
        events: [],
    }
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    componentDidMount() {
        this.fetchEvents();
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
        const price = +this.priceElRef.inputRef.current.value; // + converts to number
        const date = this.dateElRef.inputRef.current.value;
        const description = this.descriptionElRef.ref.current.value;

        if (
            title.trim().length === 0 ||
            price.length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) { return; }

        const event = { title, price, date, description };
        console.table(event);
        const queryBody = {
            query: `
            mutation {
                createEvent(eventInput: {title: "${title}", price: ${price}, date: "${date}", description: "${description}"}) {
                  _id
                  title 
                  description
                  date
                  price
                  creator {
                      _id
                      email
                  }
                }
              }
            `
        };
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(queryBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.token}`
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Erreur de connexion");
            }
            return res.json();        
        }).then(
            resData => {
                console.table(resData);
                this.setState({
                    events: [
                        ...this.state.events,
                        event,
                    ]
                })
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    fetchEvents = () => {
        const queryBody = {
            query: `
            query {
                events {
                  _id
                  title 
                  description
                  date
                  price
                  creator {
                      _id
                      email
                  }
                }
              }
            `
        };
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(queryBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Erreur de connexion");
            }
            return res.json();        
        }).then(
            resData => {
                console.table(resData);
                const events = resData.data.events;
                this.setState({
                    events: [ ...events ],
                })
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
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
                                <Input
                                    placeholder="titre de l'évènement"
                                    ref={ref => this.titleElRef = ref}
                                ></Input>
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
                                <Input
                                    type="datetime-local"
                                    ref={ref => this.dateElRef = ref}
                                ></Input>
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
                {this.context.token && <div className="create-event_button">
                    <Button onClick={this.handleCreateEventButton}>Créer un évènement</Button>
                </div>}
                <ul className="events__list">
                    {this.state.events && this.state.events.map(
                    evt => <li className="event__item">
                        <span className="event__item__cell"><strong>titre:</strong> {evt.title}</span> 
                        <span className="event__item__cell"><strong>prix:</strong> {evt.price} €</span>
                        <span className="event__item__cell"><strong>description:</strong> {evt.description}</span> 
                        <span className="event__item__cell"><strong>date:</strong> <Moment dateToFormat={evt.date} format="DD/MM/YYYY" /></span>
                    </li>
                    )}
                </ul>
            </>
        );
    }
}

export default EventsPage;