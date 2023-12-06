'use client'
import ModifiedTable from "@/components/ModifiedTable";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 500,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 150,
        editable: false
    },
    {
        field: 'channel',
        headerName: 'Channel',
        width: 200,
        editable: true
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

const YoutubePage = () => {

    const [videos, setVideos] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch('/api/youtube');
            const data = await response.json();

            const newData = data.map((item, idx) => {
                return {
                    ...item,
                    'id': item._id
                };
            })

            setVideos(newData);
        }

        fetchVideos();
    }, []);

    return <ModifiedTable data={videos} columns={columns} category={'Video'} setFetchAgain={setFetchAgain} />
}

export default YoutubePage 