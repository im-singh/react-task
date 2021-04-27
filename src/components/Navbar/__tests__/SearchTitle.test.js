import { render, screen, fireEvent } from '../../../testing/testingSetup';
import SearchTitle from '../SearchTitle';

describe("<SearchTitle/> component", () => {
    test("should render correctly", () => {
        let { container } = render(<SearchTitle />);
        expect(screen.getByTestId("search-title")).toBeInTheDocument();
    })

    test("should render input field", () => {
        let { container } = render(<SearchTitle />);
        let input = container.querySelector("input");
        expect(input).toBeInTheDocument();
    })

})