'use client'
import ModifiedTable from "@/components/ModifiedTable";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        width: 500,
        editable: true
    },
    {
        field: 'link',
        headerName: 'Link',
        editable: true,
        renderCell: (params) => {
            return <Button variant="contained" target="_blank" href={params['formattedValue']}>Open</Button>;
        }
    },
];

const ResearchersPage = () => {
    const [researchers, setResearchers] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchPapers() {
            const response = await fetch('/api/researchers');
            const data = await response.json();

            const newData = data.map((d, i) => {
                return {
                    ...d,
                    'id': d._id,
                };
            });

            setResearchers(newData);
        }

        fetchPapers();
    }, [fetchAgain]);

    return <ModifiedTable data={researchers} columns={columns} category={'Researchers'} setFetchAgain={setFetchAgain} />;
}

export default ResearchersPage;