import React, { useState, propTypes, useContext } from 'react';
import { Form } from 'semantic-ui-react';
import AuthContext from '../context/auth-context';

import './Auth.css';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState('login');
    const context = useContext(AuthContext);

    const handleSubmit = (event) => {
        view === 'login'
            ? connectUser(event)
            : createUser(event);
    }

    /**
     * create user API request
     * @param {event} eventPassed 
     */
    const createUser = eventPassed => {
        eventPassed.preventDefault();
        if (email.trim() === '' || password === '') return;
        const queryBody = {
            query: `
            mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                    _id
                    email
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
                console.table(resData.data.login);
                if (resData.errors) {
                    alert(resData.errors[0].message);
                }
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    /**
     * connect user to API request
     * @param {event} eventPassed 
     */
    const connectUser = (eventPassed) => {
        eventPassed.preventDefault();
        console.log(email, password);
        if (email.trim() === '' || password === '') return;

        const queryBody = {
            query: `
            query {
                login(email: "${email}", password: "${password}") {
                  userId
                  token 
                  tokenExpiration
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
                console.table(resData.data.login);
                if (resData.data.login.token) {
                    context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
                }
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    const handleChangeEmail = (event, target) => setEmail(target.value)
    const handleChangePassword = (event, target) => setPassword(target.value)
    

    
    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Input
                label="email"
                placeholder="email"
                value={email}
                onChange={handleChangeEmail}
            >
            </Form.Input>
            <Form.Input
                label="mot de passe"
                placeholder="mot de passe"
                type="password"
                value={password}
                onChange={handleChangePassword}
            >
            </Form.Input>
            {view === 'login' && <Form.Button id="signup" onClick={() => setView('signup')}>Créer un compte</Form.Button>}
            {view === 'signup' && <Form.Button onClick={() => setView('login')}>Déjà un compte ?</Form.Button>}
            <Form.Button type="submit">{view === 'login' ? 'Se connecter' : 'S\'inscrire'}</Form.Button>
        </Form>
    );
    
}

AuthPage.propTypes = {

}

export default AuthPage;