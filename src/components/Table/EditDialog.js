import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { closeDialog } from '../../redux/Dialog/actions';
import { updateProduct } from '../../redux/Products/actions';

const useStyles = makeStyles((theme) => ({
    textArea: {
        display: 'block',
        marginBottom: '20px',
        backgroundColor: '#f2f2f2',
        padding: '4px 5px',
        borderRadius: '3px',
        borderColor: '#666',
        borderWidth: '2px',
        borderStyle: "solid",
        [theme.breakpoints.up('sm')]: {
            width: '400px',
        },
    },
    label: {
        fontSize: '1rem',
        fontWeight: '500',
    }
}))
export default function FormDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { isOpen, selectedProduct } = useSelector(({ dialogState }) => dialogState)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen && selectedProduct) {
            setTitle(selectedProduct.title);
            setDescription(selectedProduct.body);
        }
    }, [isOpen])
    const handleSubmit = () => {
        let id = selectedProduct.id;
        dispatch(updateProduct({ id, title, description }))
    }
    const handleClose = () => {
        dispatch(closeDialog())
    };
    const handleInput = (e, type) => {
        if (type === 'title') {
            setTitle(e.target.value)
        }
        else {
            setDescription(e.target.value);
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="edit-details" data-testid="edit-dialog">
                <DialogTitle id="form-dialog-title">Edit product details</DialogTitle>
                <DialogContent>
                    <label className={classes.label} htmlFor="title">
                        Title
                    </label>
                    <TextareaAutosize
                        aria-label="title"
                        id="title"
                        className={classes.textArea}
                        rowsMin={1}
                        rowsMax={3}
                        cols={30}
                        value={title}
                        placeholder="title"
                        onChange={(e) => handleInput(e, 'title')}
                    />
                    <label className={classes.label} htmlFor="description">Description</label>
                    <TextareaAutosize
                        aria-label="description"
                        id="description"
                        rowsMin={2}
                        rowsMax={4}
                        cols={30}
                        className={classes.textArea}
                        value={description}
                        placeholder="description"
                        onChange={(e) => handleInput(e, 'description')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" size="small" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" size="small" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}