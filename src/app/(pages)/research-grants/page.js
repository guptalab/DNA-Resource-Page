'use client'
import ModifiedTable from "@/components/ModifiedTable";
import StripedDataGrid from "@/components/StripedDataGrid";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'organization',
        headerName: 'Organization',
        width: 500,
        editable: true
    },
    {
        field: 'amountOfFund',
        headerName: 'Amount of Fund(in USD)',
        width: 250,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 250,
        editable: false
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 250,
        type: 'date',
        editable: true
    },
    {
        field: 'endDate',
        headerName: 'End Date',
        width: 250,
        type: 'date',
        editable: true
    },
    {
        field: 'link',
        headerName: 'Link',
        editable: true,
        renderCell: (params) => {
            return <Button variant="contained" target="blank" href={params['formattedValue']}>Open</Button>;
        }
    },
];

const GrantsPage = () => {

    const [grants, setGrants] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchGrants() {
            const response = await fetch('/api/grants');
            const data = await response.json();

            const newData = data.map((item, idx) => {
                return {
                    ...item,
                    'amountOfFund': item['amountOfFund'].toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }),
                    'id': item._id,
                    'startDate': new Date(item['startDate']),
                    'endDate': new Date(item['endDate'])
                };
            })

            setGrants(newData);
        }

        fetchGrants();
    }, [fetchAgain]);


    return <ModifiedTable data={grants} columns={columns} category={'Research Grant'} setFetchAgain={setFetchAgain} />
}

export default GrantsPage 