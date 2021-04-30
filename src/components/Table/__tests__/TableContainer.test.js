import { render, screen, fireEvent, } from '../../../testing/testingSetup';
import configureStore from 'redux-mock-store';

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
        let { container } = render(<TableContainer />, { initialState: { productState } });
        let rows = screen.getAllByTestId("table-row");
        expect(rows.length).toBe(1);
    });

})

describe("<TableContainer/> component with redux state", () => {
    let mockState = {
        productState: {
            products: [
                {
                    userId: 1,
                    id: 1,
                    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'qui est esse',
                    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
                },
            ],
            isLoading: false,
            isError: false,
            error: '',
            searchedValue: ''
        },
        dialogState: {
            isOpen: false,
            selectedProduct: null
        }
    }
    let store;
    beforeEach(() => {
        const mockStore = configureStore();
        store = mockStore(mockState);
        store.dispatch = jest.fn();
        render(<TableContainer />, { store });
    })
    test("click on table-row should dispatch open dialog", () => {
        let tRows = screen.getAllByTestId("table-row");
        fireEvent.click(tRows[0]);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, { type: 'OPEN_DIALOG', payload: mockState.productState.products[0] })
    })

})