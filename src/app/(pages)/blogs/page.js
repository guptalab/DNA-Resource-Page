'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
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
        width: 250,
        editable: false
    },
    {
        field: 'organization',
        headerName: 'Organization',
        width: 250,
        editable: true
    },
    {
        field: 'link',
        headerName: 'Link',
        editable: true,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>
                {params['formattedValue'] === '' ? '🖕' : 'Open'}
            </Button>;
        }
    },
];

const BlogsPage = () => {

    const [blogs, setBlogs] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await fetch('/api/blogs');
            const data = await response.json();

            const newData = data.map((item, idx) => {
                return {
                    ...item,
                    'id': item._id
                };
            })

            setBlogs(newData);
        }

        fetchBlogs();
    }, [fetchAgain]);

    return <ModifiedTable data={blogs} columns={columns} category={'Blog'} setFetchAgain={setFetchAgain} />
}

export default BlogsPage 