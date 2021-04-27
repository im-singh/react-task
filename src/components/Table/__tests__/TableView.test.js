import { render, screen, fireEvent } from '../../../testing/testingSetup';

import TableView from '../TableView';

describe('<TableView/> component', () => {
    let rows = [{ id: 1, title: "title 1", body: "description 1" }, { id: 2, title: "title 2", body: "description 2" }]
    let columns = ['Sr.no', 'Title', 'Description'];

    test('should render correctly', () => {
        let { container } = render(<TableView tableRows={rows} />);
        expect(screen.getByLabelText("product-table")).toBeInTheDocument();

    })
    test.only('should render header correctly', () => {
        let { container } = render(<TableView tableRows={rows} />);
        let thead = container.querySelector("thead");
        expect(thead).toBeInTheDocument();
        let thTags = thead.querySelectorAll("th");
        columns.forEach((ele, idx) => {
            expect(thTags[idx].textContent).toBe(ele);
        })
    })
    test("shoud render rows data", () => {
        let { container } = render(<TableView tableRows={rows} />);
        let tRows = screen.getAllByTestId("table-row");
        expect(tRows.length).toBe(rows.length);
    })
    test.each([[0, rows[0]], [1, rows[1]]])
        ("shoud render title and body", (idx, product) => {
            let { container } = render(<TableView tableRows={rows} />);
            let tRows = screen.getAllByTestId("table-row");
            expect(tRows[idx]).toHaveTextContent(idx + 1);
            expect(tRows[idx]).toHaveTextContent(product.title)
            expect(tRows[idx]).toHaveTextContent(product.body)
        })
    test.only("shoud invoke show dialog", () => {
        let showDialog = jest.fn();
        let { container } = render(<TableView tableRows={rows} showDialog={showDialog} />);
        let tRows = screen.getAllByTestId("table-row");
        fireEvent.click(tRows[0]);
        expect(showDialog).toHaveBeenNthCalledWith(1, rows[0])
    })
})