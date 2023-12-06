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
        field: 'authors',
        headerName: 'Authors',
        width: 400,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 250,
        editable: false
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

const BooksPage = () => {

    const [books, setBooks] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await fetch('/api/books');
            const data = await response.json();

            const newData = data.map((item) => {
                return {
                    ...item,
                    'id': item._id
                };
            })

            setBooks(newData);
        }

        fetchBlogs();
    }, [fetchAgain]);

    return <ModifiedTable data={books} columns={columns} category={'Book'} setFetchAgain={setFetchAgain} />
}

export default BooksPage 