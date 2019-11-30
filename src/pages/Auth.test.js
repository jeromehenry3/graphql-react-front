import React from 'react';
import ReactDOM from 'react-dom';
import AuthPage from './Auth';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { cleanup, render, simulate } from '@testing-library/react';
import expectExport from 'expect';




// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   render(<AuthPage />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// it('should render a <h1> containing : Erreur 404 : la page que vous recherchez n\'existe pas.', () => {
//     const div = document.createElement('div');
//     render(<AuthPage />, div);
//     expect(div).toHaveTextContent('Erreur 404 : la page que vous recherchez n\'existe pas.')
// })

test('should render <AuthPage /> as defined', () => {
  const component = renderer.create(
    <AuthPage />
  );
  let tree = component.toJSON();
  expectExport(tree).toMatchSnapshot();

  // Changement de vue
    const instance = component.root.findByProps({id: "signup"});
    ReactTestUtils.Simulate.click(instance)



  // expect(component).
});
