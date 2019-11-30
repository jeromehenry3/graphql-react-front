import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from './NotFoundPage';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';
import expectExport from 'expect';




// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   render(<NotFoundPage />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// it('should render a <h1> containing : Erreur 404 : la page que vous recherchez n\'existe pas.', () => {
//     const div = document.createElement('div');
//     render(<NotFoundPage />, div);
//     expect(div).toHaveTextContent('Erreur 404 : la page que vous recherchez n\'existe pas.')
// })

test('should render <NotFoundPage /> as defined', () => {
  const component = renderer.create(
    <NotFoundPage />
  );
  let tree = component.toJSON();
  expectExport(tree).toMatchSnapshot();
})

