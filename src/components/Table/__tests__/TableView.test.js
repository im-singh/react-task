import { render, screen, fireEvent } from '../../../testing/testingSetup';

import TableView from '../TableView';
let tableRows = [{ id: 1, title: "title 1", body: "description 1" }, { id: 2, title: "title 2", body: "description 2" }]
let columns = ['Sr.no', 'Title', 'Description'];

describe('<TableView/> component', () => {
    let contDiv;
    beforeEach(() => {
        let { container } = render(<TableView tableRows={tableRows} />);
        contDiv = container;
    })
    test('should render correctly', () => {
        expect(screen.getByLabelText("product-table")).toBeInTheDocument();
    })
    test('should render header correctly', () => {
        let thead = contDiv.querySelector("thead");
        expect(thead).toBeInTheDocument();
        let thTags = thead.querySelectorAll("th");
        columns.forEach((ele, idx) => {
            expect(thTags[idx].textContent).toBe(ele);
        })
    })
    test("shoud render rows data", () => {
        let tRows = screen.getAllByTestId("table-row");
        expect(tRows.length).toBe(tableRows.length);
    })
    test.each([[0, tableRows[0]], [1, tableRows[1]]])
        ("shoud render title and body", (idx, product) => {
            let tRows = screen.getAllByTestId("table-row");
            expect(tRows[idx]).toHaveTextContent(idx + 1);
            expect(tRows[idx]).toHaveTextContent(product.title)
            expect(tRows[idx]).toHaveTextContent(product.body)
        })
})

describe("<TableView/> component", () => {
    test("shoud invoke show dialog", () => {
        let showDialog = jest.fn();
        let { container } = render(<TableView tableRows={tableRows} showDialog={showDialog} />);
        let tRows = screen.getAllByTestId("table-row");
        fireEvent.click(tRows[0]);
        expect(showDialog).toHaveBeenNthCalledWith(1, tableRows[0])
    })
})