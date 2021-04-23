import { render, screen, fireEvent, cleanup, queryByTestId } from '../../../testing/testingSetup';
import { mockProductState } from '../../../mockStates/produtsState';
import DataListContainer from '../DataListContainer';

describe('<DataListContainer/> component', () => {
    test("should not render <DataList/> and <Editdialog/> without state", () => {
        render(<DataListContainer />);
        expect(screen.queryByTestId("list")).toBeNull();
        expect(screen.queryByTestId("edit-dialog")).toBeNull();
    })
    test("should render circular loader", () => {
        render(<DataListContainer />);
        expect(screen.queryByTestId("loader")).toBeInTheDocument();
    })
});

describe('<DataListContainer/> component with state', () => {
    let contDiv;
    beforeEach(() => {
        let { container } = render(<DataListContainer />, { initialState: mockProductState });
        contDiv = container;
    })
    afterEach(() => cleanup());

    test('should render product list', () => {
        expect(screen.queryByTestId("list")).toBeInTheDocument();
    })
    test.each([0, 1, 2])('should render edit dialog on clicking any product', (idx) => {
        let product = mockProductState.productState.products[idx];
        let item = screen.getAllByTestId("list-item");
        fireEvent.click(item[idx]);

        expect(screen.getByTestId("edit-dialog")).toBeInTheDocument();
        expect(screen.getByLabelText("title").value).toBe(product.title)
        expect(screen.getByLabelText("description").value).toBe(product.body)
    })
})