import { render, screen, fireEvent, cleanup, waitForElementToBeRemoved } from '../../../testing/testingSetup';
import { matchSorter } from 'match-sorter'

import TableContainer from '../TableContainer';


describe('<TableContainer/> component', () => {
    test('should render correctly', () => {
        let { container } = render(<TableContainer />);
        expect(screen.getByLabelText("product-table")).toBeInTheDocument();
    })
})
describe('<TableContainer/> component with state', () => {

    test('should render <Error/> when isError=true', () => {
        let { container } = render(<TableContainer />, { initialState: { productState: { isError: true, products: [], searchedValue: "" } } });
        expect(screen.queryByLabelText("product-table")).toBeNull();
        expect(container.textContent).toBe("Server Error, Please try again.")
    })

    test('should render <CircularLoader/> when isLoading=true', () => {
        let { container } = render(<TableContainer />, { initialState: { productState: { isLoading: true, products: [], searchedValue: "" } } });
        expect(screen.queryByLabelText("product-table")).toBeNull();
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })
    test('should render <EditDialog/> when isOpen==true', () => {
        let dialogState = {
            isOpen: true,
            selectedProduct: {
                userId: 1,
                id: 2,
                title: 'title 1',
                body: 'des 2'
            }
        }
        let { container } = render(<TableContainer />, { initialState: { dialogState } });
        expect(screen.getByTestId("edit-dialog")).toBeInTheDocument();
    })
    test('should render product table when isError and isLoading are false', () => {
        let { container } = render(<TableContainer />, { initialState: { productState: { products: [], searchedValue: "" } } });
        expect(screen.getByLabelText("product-table")).toBeInTheDocument();
    });
    test('should render filtered values only', () => {
        let productState = {
            products: [
                { title: "title 1", body: "des1" },
                { title: "this is me", body: 'des 2' },
                { title: "this m is e", body: 'des 2' },

            ],
            searchedValue: "me"
        }
        const matchedRows = matchSorter(productState.products, 'me', { keys: ['title'] })
        let { container } = render(<TableContainer />, { initialState: { productState } });
        let rows = screen.getAllByTestId("table-row");
        expect(rows.length).toBe(matchedRows.length);
    });

})