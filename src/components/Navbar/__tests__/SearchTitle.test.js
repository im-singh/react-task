import { render, screen, fireEvent } from '../../../testing/testingSetup';
import configureStore from 'redux-mock-store';
import SearchTitle from '../SearchTitle';
import productTypes from '../../../redux/Products/types';

describe("<SearchTitle/> component", () => {
    let contDiv;
    beforeEach(() => {
        let { container } = render(<SearchTitle />);
        contDiv = container;
    })
    test("should render correctly", () => {
        expect(screen.getByTestId("search-title")).toBeInTheDocument();
    })

    test("should render input field", () => {
        expect(screen.getByLabelText("Search Title")).toBeInTheDocument();
    })
    test("should render form", () => {
        let form = contDiv.querySelector("input");
        expect(form).toBeInTheDocument();
    })
    test("should render search button", () => {
        expect(screen.getByTestId("search-btn")).toBeInTheDocument();
    })
})

describe("<SearchTitle/> component with redux state", () => {
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
                    title: 'qui est esse rerum',
                    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
                },
            ],
            isLoading: false,
            isError: false,
            error: '',
            searchedValue: 'df'
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
        render(<SearchTitle />, { store });
    })
    test('click on submit should dispatch searchValue action', () => {
        let tempValue = "skks"
        let inputField = screen.getByLabelText("Search Title");
        fireEvent.change(inputField, { target: { value: tempValue } })
        let btn = screen.getByTestId("search-btn");
        fireEvent.click(btn);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, { type: productTypes.UPDATE_SEARCH_VALUE, payload: tempValue })
    })
    test('click on any option and open dialog', () => {
        let tempValue = "rerum"
        let inputField = screen.getByLabelText("Search Title");
        fireEvent.change(inputField, { target: { value: tempValue } })
        let liOption = screen.getByText("qui est esse rerum");
        fireEvent.click(liOption);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, { type: 'OPEN_DIALOG', payload: mockState.productState.products[1] })
    })
})