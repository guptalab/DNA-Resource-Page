import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import StripedDataGrid from "./StripedDataGrid";
import { forwardRef, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { RxCross2 } from 'react-icons/rx';
import { LoadingButton } from "@mui/lab";
import { GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const api = {
    'Research Paper': '/api/articles-papers',
    'Blog': '/api/blogs',
    'Event': '/api/events',
    'Course': '/api/courses',
    'Patent': '/api/patents',
    'Project': '/api/projects',
    'Research Grant': '/api/grants',
    'Simulation Tool': '/api/simulation-tools',
    'Software/Tool': '/api/softwares',
    'Video': '/api/youtube',
    'Book': '/api/books',
    'Researchers': '/api/researchers',
};

const resourceTypes = {
    'Research Paper': "Articles And Papers",
    'Blog': "Blog",
    'Company': "Company",
    'Course': "Course",
    'Event': "Event",
    'Research Grant': "Grant",
    'Patent': "Patent",
    'Project': "Project",
    'Simulation Tool': "Simulation Tool",
    'Software/Tool': "Software",
    'Video': "You Tube",
    'Book': "Book"
}

const placeholders = {
    'title': 'e.g, DNA Security in Cloud Computing',
    'topics': 'e.g, Cloud Computing, DNA Security',
    'authors': 'e.g, John Doe, Jane Doe',
    'publishedDate': 'e.g, 2021-10-12',
    'source': 'e.g, IEEE',
    'link': 'e.g, https://www.google.com/',
    'organizations': 'e.g, IEEE, ACM',
    'name': 'e.g, IEEE',
    'description': 'e.g, IEEE is the world\'s largest technical professional organization dedicated to advancing technology for the benefit of humanity.',
    'category': 'e.g, Conference',
    'date': 'e.g, 2021-10-12',
    'location': 'e.g, Virtual',
    'eligibility': 'e.g, All',
    'organization': 'e.g, IEEE',
    'fundingAgency': 'e.g, IEEE',
    'amountOfFund': 'e.g, 1000000',
    'channel': 'e.g, IEEE',
}

export default function ModifiedTable({ data, columns, category, setFetchAgain }) {

    // provides the session object to the client
    let session = useSession();

    // switch for add-item dialog box
    const [accessDialogOpen, setAccessDialogOpen] = useState(false);

    // variable for storing input values in a single object
    const [input, setInput] = useState({
        'publishedDate': new Date().toISOString().slice(0, 10).toString(),
        'startDate': new Date().toISOString().slice(0, 10).toString(),
        'endDate': new Date().toISOString().slice(0, 10).toString(),
    });

    // switch for snackbar
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

    // access control for add-item dialog box
    const [canEdit, setCanEdit] = useState(undefined);

    // switch for request dialog box
    const [requestDialogOpen, setRequestDialogOpen] = useState(false);

    // stores userStatus data
    const [userStatus, setUserStatus] = useState(undefined);

    // request loading
    const [requestLoading, setRequestLoading] = useState(undefined);

    // delete loading
    const [deleteLoading, setDeleteLoading] = useState(false);

    // add Loading
    const [addLoading, setAddLoading] = useState(false);

    const fetchUserDetails = async () => {
        const response = await fetch('/api/user');
        if (!response.ok) {
            setCanEdit(false);
            setUserStatus('none');
            return;
        }

        const user = await response.json();

        setCanEdit(
            (user) &&
            (
                (user.role === 'admin') ||
                (user.role === 'user' && user.userStatus === 'accepted')
            )
        );

        setUserStatus(user && user.userStatus ? user.userStatus : 'none');
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleChangeInput = (field, value) => {
        setInput(prev => { return { ...prev, [field]: value } });
    }

    const handleClickOpen = () => {
        if (canEdit)
            setAccessDialogOpen(true);
        else
            setRequestDialogOpen(true);
    };

    const handleClose = () => {
        if (canEdit)
            setAccessDialogOpen(false);
        else
            setRequestDialogOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbar(prev => { return { ...prev, open: true } });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(prev => { return { ...prev, open: false } });
    };


    const clearAllInput = () => {
        setInput({});
        setAccessDialogOpen(false);

        // clear all textfields
        const textFields = document.querySelectorAll('input[type="text"]');
        textFields.forEach((item) => {
            item.value = '';
        });

        handleSnackbarOpen();
    }

    const requestAccess = async () => {
        setRequestLoading(true);
        const response = await fetch('/api/users/requestEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: session.data.user.email })
        });

        if (response.status === 200) {
            setRequestLoading(false);
            setUserStatus('pending');
        }
        else {
            console.error('request failed: ', response);
        }
    }

    const addItem = async () => {
        setAddLoading(true);
        const response = await fetch(api[category], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...input,
                type: resourceTypes[category],
                // publishedDate: new Date(input.publishedDate).toISOString(),

            })
        });

        setAddLoading(false);

        if (response.ok) {
            setFetchAgain(prev => !prev);
            clearAllInput();
            setSnackbar({
                open: true,
                message: `${category} added successfully`,
                type: 'success'
            })
            setAccessDialogOpen(false);
        }
        else {
            console.error('add failed: ', response);
            setSnackbar({
                open: true,
                message: `Error adding ${category}, try again with correct inputs!`,
                type: 'error'
            })
        }
    }

    const progress = (
        <Box width={'100%'} height={'calc(100vh - 5rem)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress color="inherit" />
        </Box>
    );

    function CustomToolbar() {
        const apiRef = useGridApiContext();
        if (!session || !session.data) return;

        const handleDeleteItems = async () => {
            setDeleteLoading(true);
            const selectedRows = apiRef.current.getSelectedRows();

            const requests = [];
            selectedRows.forEach((item) => {
                requests.push(fetch(`${api[category]}/${item._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }));
            });

            if (!canEdit) {
                setSnackbar({
                    open: true,
                    message: `You are not authorized to delete ${category}`,
                    type: 'error'
                })
                setDeleteLoading(false);
                return;
            }

            if (requests.length === 0) {
                setSnackbar({
                    open: true,
                    message: `Select at least one ${category} to delete`,
                    type: 'info'
                })
                setDeleteLoading(false);
                return;
            }

            const response = await Promise.all(requests);

            setDeleteLoading(false);

            if (response.every((item) => item.ok)) {
                setFetchAgain(prev => !prev);
                setSnackbar({
                    open: true,
                    message: `${category}/s deleted successfully`,
                    type: 'success'
                })
            }
            else {
                console.error('delete failed: ', response);
                setSnackbar({
                    open: true,
                    message: `Error deleting ${category}, try again with correct inputs!`,
                    type: 'error'
                })
            }
        }

        return (
            <GridToolbarContainer>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>
                    <LoadingButton
                        variant='text'
                        loading={addLoading}
                        onClick={() => handleClickOpen()}
                        disabled={!(session && session.data.user !== null) || (canEdit === undefined || userStatus === undefined)}
                    >
                        <AiOutlinePlus style={{ fontSize: '1.2rem', marginRight: '.5rem' }} />
                        Add New
                    </LoadingButton>

                    <LoadingButton
                        variant='text'
                        loading={deleteLoading}
                        onClick={() => handleDeleteItems()}
                        disabled={!(session && session.data.user !== null) || (canEdit === undefined || userStatus === undefined)}
                    >
                        <MdDelete style={{ fontSize: '1.2rem', marginRight: '.5rem' }} />
                        Delete item/s
                    </LoadingButton>
                </Box>
            </GridToolbarContainer>
        );
    }


    const dataGrid = (
        <Box display={'flex'} marginTop={2} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
            {/* {addButton} */}
            <Box width={'100%'} padding={0} sx={{ background: 'transparent', zIndex: '2', backdropFilter: 'saturate(180%) blur(30px)' }} height={'calc(100vh - 6rem)'} borderRadius={'1rem'} >
                <StripedDataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: canEdit ? 11 : 12,
                            },
                        },
                    }}
                    style={{
                        borderRadius: '1rem',
                        background: 'rgba(251, 251, 251, 0.7)',
                    }}
                    pageSizeOptions={[canEdit ? 11 : 12, 25, 50]}
                    getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                    sx={{
                        flexGrow: '1'
                    }}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    checkboxSelection
                    processRowUpdate={
                        async (params) => {
                            if (!canEdit) return;
                            try {
                                const newParam = { ...params };
                                delete newParam._id;

                                const response = await fetch(`${api[category]}/${params.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        ...newParam
                                    })
                                });

                                if (response.ok) {
                                    setSnackbar({
                                        open: true,
                                        message: `${category} updated successfully`,
                                        type: 'success'
                                    })
                                } else {
                                    return new Promise.reject('Something went wrong');
                                }

                                return params;
                            } catch (err) {
                                return new Promise.reject('Something went wrong');
                            }
                        }
                    }
                    onProcessRowUpdateError={
                        (e) => {
                            console.error('update failed: ', e);
                            setSnackbar({
                                open: true,
                                message: `Error updating ${category}, try again with correct inputs!`,
                                type: 'error'
                            })
                        }
                    }
                />
            </Box>
        </Box>
    );

    const AddButtonFormInput = (
        <Dialog
            open={accessDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="add-item-slide"
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle>{'Add ' + category}</DialogTitle>
            <DialogContent>
                {columns.map((item, key) => {
                    if (item.field === 'type') {
                        return <TextField
                            type="text"
                            disabled
                            sx={{ display: 'block', margin: '1rem 0' }}
                            label={item.headerName}
                            placeholder={item.field}
                            key={key}
                            fullWidth
                            value={`${category}`}
                        />
                    }
                    if (item.type === 'date') {
                        return <TextField
                            type="date"
                            sx={{ display: 'block', margin: '1rem 0' }}
                            label={item.headerName}
                            // placeholder={placeholders[item.field]}
                            defaultValue={new Date().toISOString().slice(0, 10).toString()}
                            key={key}
                            fullWidth
                            onChange={(e) => handleChangeInput(item.field, e.target.value)}
                        />
                    }
                    return <TextField
                        type={'text'}
                        sx={{ display: 'block', margin: '1rem 0' }}
                        label={item.headerName}
                        placeholder={placeholders[item.field]}
                        key={key}
                        fullWidth
                        onChange={(e) => handleChangeInput(item.field, e.target.value)}
                    />
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={addItem}>Add</Button>
            </DialogActions>
        </Dialog >
    );

    const RequestDialog = (
        <Dialog
            open={requestDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="request-item-slide"
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle>{'Permission Denied'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are not authorized to add {category}. Please request the admin for permission to edit.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {userStatus !== 'rejected' && <Button onClick={handleClose}>Cancel</Button>}
                {userStatus === 'pending' && <LoadingButton loading={requestLoading} variant="contained" disabled><AiOutlineClockCircle style={{ fontSize: '1.1rem', marginRight: '.5rem' }} />Request Pending</LoadingButton>}
                {userStatus === 'none' && <LoadingButton loading={requestLoading} variant="contained" onClick={() => { requestAccess() }}>Request Access</LoadingButton>}
                {userStatus === 'rejected' && <LoadingButton loading={requestLoading} variant="contained" color="error" onClick={handleClose}><RxCross2 style={{ fontSize: '1.1rem', marginRight: '.5rem' }} /><strong>Admin rejected your request</strong>. Click to close</LoadingButton>}
            </DialogActions>
        </Dialog>
    )

    const toast = (
        <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbar.type} sx={{ width: '100%', fontWeight: 'bold' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );

    return (
        <>
            {data === null && progress}
            {data !== null && dataGrid}
            {AddButtonFormInput}
            {RequestDialog}
            {toast}
        </>
    );
}