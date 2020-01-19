import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import './Modal.css';

const Modal = props => (
    <div className="modal">
        <header className="modal__header">
            <h1>{props.title}</h1>
        </header>
        <section className="modal__content">
            {props.children}
        </section>
        <section className="modal__actions">
            {props.canCancel && <Button className="button" onClick={props.canCancel}>Annuler</Button>}
            {props.canConfirm && <Button className="button" onClick={props.canConfirm}>Confirmer</Button>}
        </section>
    </div>
)

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    canCancel: PropTypes.func,
    canConfirm: PropTypes.func,
    children: PropTypes.any,
}

export default Modal;