import { render, screen } from '../../../testing/testingSetup';
import Navbar from '../Navbar';

describe("<Navbar/> component", () => {
    let contDiv;
    beforeEach(() => {
        let { container } = render(<Navbar />);
        contDiv = container;
    })

    test('should render correctly', () => {
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
    })
    test('should render h1 title', () => {
        expect(contDiv.querySelector("h1")).toBeInTheDocument();
    })
    test('should render <SearchTitle/>', () => {
        expect(screen.getByTestId("search-title")).toBeInTheDocument();
    })
})