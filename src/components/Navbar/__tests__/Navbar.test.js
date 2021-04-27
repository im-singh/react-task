import { render, screen } from '../../../testing/testingSetup';
import Navbar from '../Navbar';

describe("<Navbar/> component", () => {
    test('should render correctly', () => {
        let { container } = render(<Navbar />);
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
    })
    test('should render h1 title', () => {
        let { container } = render(<Navbar />);
        expect(container.querySelector("h1")).toBeInTheDocument();
    })
    test('should render <SearchTitle/>', () => {
        render(<Navbar />);
        expect(screen.getByTestId("search-title")).toBeInTheDocument();
    })
})