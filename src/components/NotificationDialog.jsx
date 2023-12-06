import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BiSolidBell } from 'react-icons/bi';
import { IoMdCheckmark } from 'react-icons/io';
import { HiMiniXMark } from 'react-icons/hi2';

const NotificationDialog = ({
    open,
    setOpen
}) => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const fetchRequests = async () => {
            try {
                const res = await fetch('/api/users/pendingRequest');
                const data = await res.json();

                setRequests(data.requests);
            } catch (err) {
                console.log(err);
            }
        }

        fetchRequests();
    }, []);

    const grantAccess = async (id) => {
        const res = await fetch(
            `/api/user/access?id=${id}&access=true`,
            { method: 'POST' });
        if (res.ok) {
            setRequests(requests.filter((request) => request._id !== id));
        }
    }

    const refuseAccess = async (id) => {
        const res = await fetch(
            `/api/user/access?id=${id}&access=false`,
            { method: 'POST' });
        if (res.ok) {
            setRequests(requests.filter((request) => request._id !== id));
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth={'sm'}
            fullWidth={true}
            scroll='paper'
        >
            <DialogTitle
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
            >
                <BiSolidBell style={{ marginRight: '.5rem' }} />
                Notifications
            </DialogTitle>
            <DialogContent>
                {requests.map((request) => (
                    <>
                        <Box key={request._id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                <Typography>{request.name}</Typography>
                                <Typography>{request.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <IoMdCheckmark onClick={() => grantAccess(request._id)} style={{ fontSize: '2rem', background: '#10ac84', padding: '.4rem', borderRadius: '50%', color: 'white', marginRight: '1rem' }} />
                                <HiMiniXMark onClick={() => refuseAccess(request._id)} style={{ fontSize: '2rem', background: '#e84118', padding: '.4rem', borderRadius: '50%', color: 'white' }} />
                            </Box>
                        </Box>
                    </>
                ))}
                {requests.length === 0 &&
                    <Typography fontWeight={'500'} textAlign={'center'}>No new Notifications</Typography>
                }
            </DialogContent>
        </Dialog>
    )
}

export default NotificationDialog