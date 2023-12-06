'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 250,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 500,
        editable: false
    },
    {
        field: 'link',
        headerName: 'Link',
        editable: true,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>
                Open
            </Button>;
        }
    },
];

const SoftwaresPage = () => {

    const [softwares, setSoftwares] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch('/api/softwares');
            const data = await response.json();

            const newData = data.map((item, idx) => {
                return {
                    ...item,
                    'id': item._id
                };
            })

            setSoftwares(newData);
        }

        fetchVideos();
    }, []);


    return <ModifiedTable data={softwares} columns={columns} category={'Software/Tool'} setFetchAgain={setFetchAgain} />
}

export default SoftwaresPage 