import React, { useMemo } from 'react';

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button } from 'react-bootstrap';
const Affichedemanderep = ({ demandesrep, handleDelete }) => {
// Fonction pour formater les dates
const formatDate = (dateString) => {
const date = new Date(dateString);
return new Intl.DateTimeFormat('fr-FR', {
year: 'numeric',
month: 'long',
day: 'numeric',
}).format(date);
};
const columns = useMemo(
() => [
{
accessorKey: 'etat',
header: 'Etat Machine',
size: 80,
},
{
accessorKey: 'symptomesPanne',
header: 'Symptôme',
size: 80,
},
{
accessorKey: 'client.nom',
header: 'Client',
size: 80,
},
{
accessorKey: 'appareil.marque',
header: 'Appareil',
size: 80,
},
{
accessorFn: (row) => formatDate(row.dateDepotAppareil),
header: 'Date Dépôt',
size: 80,
},
{
accessorFn: (row) => formatDate(row.datePrevueRep),
header: 'Date Prévue',
size: 80,
},
{
accessorKey: '_id',
header: 'Suppression',
size: 50,
Cell: ({ cell, row }) => (
    <div>
    <Button
    onClick={(e) => {
    handleDelete(cell.row.original._id);
    }}
    variant="danger"
    size="md"
    className="text-danger btn-link delete"
    
    >
    <i className="fa fa-trash" />
    </Button>
    </div>
    ),
    },
    ],
    [demandesrep]
    );
    const table = useMaterialReactTable({
    columns,
    data: demandesrep, // Les données doivent être mémoïsées ou stables
    });
    return (
    <div>
    <MaterialReactTable table={table} />
    </div>
    );
    };
    export default Affichedemanderep;