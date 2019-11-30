import React, { useState, propTypes } from 'react';
import { Form } from 'semantic-ui-react';

import './Auth.css';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState('login')

    const handleSubmit = (event) => {
        event.preventDefault();
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
        }).then(data => console.log(data))
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
            {view === 'login' && <Form.Button onClick={() => setView('signup')}>Créer un compte</Form.Button>}
            {view === 'signup' && <Form.Button onClick={() => setView('login')}>Déjà un compte ?</Form.Button>}
            <Form.Button type="submit">{view === 'login' ? 'Se connecter' : 'S\'inscrire'}</Form.Button>
        </Form>
    );
    
}

AuthPage.propTypes = {

}

export default AuthPage;