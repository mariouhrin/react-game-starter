import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Container from './Container';

render( <AppContainer>
					<Container />
				</AppContainer>,
				document.getElementById("app")
			);

if (module && module.hot) {
  module.hot.accept('./Container', () => {
    render(
      <AppContainer>
        <Container />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}
