import { render, screen, fireEvent } from '../../../testing/testingSetup';
import SearchTitle from '../SearchTitle';

describe("<SearchTitle/> component", () => {
    test("should render input field", () => {
        let { container } = render(<SearchTitle />);
        let input = container.querySelector("input");
        expect(input).toBeInTheDocument();
    })

})