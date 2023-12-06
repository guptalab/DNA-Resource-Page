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
        width: 150,
        editable: false
    },
    {
        field: 'fundingAgency',
        headerName: 'Funding Agency',
        width: 500,
        editable: true
    },
    {
        field: 'organization',
        headerName: 'Organization',
        width: 500,
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

const ProjectsPage = () => {

    const [projects, setProjects] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch('/api/projects');
            const data = await response.json();

            const newData = data.map((item, idx) => {
                return {
                    ...item,
                    'id': item._id
                };
            })

            setProjects(newData);
        }

        fetchProjects();
    }, [fetchAgain]);


    return <ModifiedTable data={projects} columns={columns} category={'Project'} setFetchAgain={setFetchAgain} />
}

export default ProjectsPage 