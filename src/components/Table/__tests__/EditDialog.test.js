import { render, screen, fireEvent, cleanup, waitForElementToBeRemoved } from '../../../testing/testingSetup';
import configureStore from 'redux-mock-store';

import EditDialog from '../EditDialog';
import productTypes from '../../../redux/Products/types';
let mockState = {
    dialogState: {
        isOpen: true,
        selectedProduct: {
            userId: 1,
            id: 3,
            title: 'title 1',
            body: 'description 1'
        }
    }
}

describe('<EditDialog/> compoent with isOpen=false', () => {
    test("should not render whenn isOpen is false", () => {
        render(<EditDialog />, { initialState: { dialogState: { isOpen: false } } });
        expect(screen.queryByTestId("edit-dialog")).toBeNull();
    })
})
describe("<EditDialog/> component with isOpen=true", () => {

    let contDiv, Store;
    beforeEach(() => {
        let { container, store } = render(<EditDialog />, { initialState: mockState });
        contDiv = container;
        Store = store;
    })
    afterEach(() => cleanup())
    test("should render when isOpen true", () => {
        expect(screen.getByTestId("edit-dialog")).toBeInTheDocument();
    })
    test("should render title and description textarea", () => {
        let titleArea = screen.getByLabelText("title");
        expect(titleArea).toBeInTheDocument();
        expect(titleArea.value).toBe(mockState.dialogState.selectedProduct.title);
        let descriptionArea = screen.getByLabelText("description");
        expect(descriptionArea).toBeInTheDocument();
        expect(descriptionArea.value).toBe(mockState.dialogState.selectedProduct.body);
    })
    test.each([['title', 'title changed'], ['description', 'description changed']])
        ("changes the value of text areas", (label, values) => {
            let textArea = screen.getByLabelText(label);
            let prevValue = textArea.value;
            fireEvent.change(textArea, { target: { value: values } });
            expect(textArea.value).toBe(values);
            expect(prevValue).not.toBe(values);
        })
    test('should render cancel and submit btn', () => {
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    })
    test('should close dialog on clicking cancel button', async () => {
        let cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn,);
        await waitForElementToBeRemoved(() => screen.queryByTestId("edit-dialog"))
        expect(screen.queryByTestId("edit-dialog")).toBeNull();
    })
    test('should close dialog on clicking submit button', async () => {
        let submitBtn = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitBtn,);
        await waitForElementToBeRemoved(() => screen.queryByTestId("edit-dialog"))
        expect(screen.queryByTestId("edit-dialog")).toBeNull();
    })

})
describe("<EditDialog/> component with redux statea", () => {
    test("click on cancelBtn should dispatch close dialog", () => {
        const mockStore = configureStore();
        const store = mockStore(mockState);
        store.dispatch = jest.fn();
        render(<EditDialog />, { store });
        let cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn,);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, { type: 'CLOSE_DIALOG' })
    })
    test("click on submitBtn should dispatch update Product", () => {
        const mockStore = configureStore();
        const store = mockStore(mockState);
        store.dispatch = jest.fn();
        render(<EditDialog />, { store });
        let titleField = screen.getByLabelText("title");
        let desField = screen.getByLabelText("description");
        let tempObj = { id: 3, title: 'title changed', description: 'des changed' }
        fireEvent.change(titleField, { target: { value: tempObj.title } });
        fireEvent.change(desField, { target: { value: tempObj.description } });
        let submitBtn = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitBtn);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, { type: productTypes.UPDATE_PRODUCT, payload: tempObj })
    })
})