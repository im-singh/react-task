import { render, screen } from './testing/testingSetup';
import App from './App';

test('renders home-page', () => {
  render(<App />);
  expect(screen.getByTestId("home-page")).toBeInTheDocument();
});

