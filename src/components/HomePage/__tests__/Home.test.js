import { render, screen } from '../../../testing/testingSetup';

import Home from '../Home';

describe("<Home/> component", () => {
    test("should render", () => {
        render(<Home />);
        expect(screen.getByTestId("home-page")).toBeInTheDocument();
    })
})
