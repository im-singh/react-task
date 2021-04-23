import { render, screen, fireEvent, cleanup } from '../../../testing/testingSetup';
import DataList from '../DataList';
import { mockProductState } from '../../../mockStates/produtsState';


describe('<DataList/> component', () => {
    test("should render loader default", () => {
        render(<DataList />);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })
    test('should render error when isError=true', () => {
        render(<DataList />, { initialState: { productState: { isError: true } } });
        expect(screen.getByText("Server error")).toBeInTheDocument();
    })
})

describe('<DataList/> component with products state', () => {
    let contDiv;
    beforeEach(() => {
        let { container } = render(<DataList />, { initialState: mockProductState });
        contDiv = container;
    })
    afterEach(() => cleanup());

    test("should not render loader and error", () => {
        expect(screen.queryByTestId("loader")).toBeNull();
        expect(screen.queryByText("Server error")).toBeNull();
    })
    test("should render list", () => {
        expect(screen.queryByTestId("list")).toBeInTheDocument();
    })
    test("should render product list", () => {
        mockProductState.productState.products.forEach((ele, idx) => {
            expect(screen.getByText(`${idx + 1} ${ele.title}`)).toBeInTheDocument();
        })
    })
})