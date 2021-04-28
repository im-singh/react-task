import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        cursor: "pointer",
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    indexColumn: {
        width: '10%',
    },
    headerRow: {
        '& th': {
            fontWeight: 500,
            fontSize: '1rem',
            letterSpacing: "1px"
        }
    }
});
export default function TableView({ tableRows, showDialog }) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="product-table">
                <TableHead>
                    <TableRow className={classes.headerRow}>
                        <StyledTableCell className={classes.indexColumn}>Sr.no</StyledTableCell>
                        <StyledTableCell align="left">Title</StyledTableCell>
                        <StyledTableCell align="left">Description</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows.map((row, idx) => (
                        <StyledTableRow key={idx} onClick={() => showDialog(row)} data-testid="table-row">
                            <StyledTableCell align="left">{idx + 1}</StyledTableCell>
                            <StyledTableCell align="left">{row.title}</StyledTableCell>
                            <StyledTableCell align="left">{row.body}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}