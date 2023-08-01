import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Table, TableBody, TableContainer, TableHead , TableRow, Icon, Box ,  TableCell, TablePagination, IconButton, TextField, Grid } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{display: "flex", flexDirection: 'row'}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon/>
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft/>
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight/>
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon/>
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const mergeJSON = (uno, dos) => {
    // eslint-disable-next-line
    Object.keys(dos).map(res => {
        uno[res] = dos[res];
    });
    return uno;
};

export default function TablaDatos({datos,titulo,ver,accion = [],style = {width: '100%'},funciones = {orderBy: false,search: false}}) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [row, setRow] = useState(datos);
    const [search, setSearch] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (search === '') {
            setRow(datos);
        }
    }, [datos, search]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   

    const searchFunction = (valor) => {
        let arrBusqueda = valor.split(",");
        let ndata = datos.filter(item => {
            let c = [];
            // eslint-disable-next-line
            Object.keys(item).map(res => {
                c.push(item[res]);
            });
            return JSON.stringify(item["system_name"])
                .toUpperCase()
                .indexOf(arrBusqueda[0].toUpperCase()) > -1;
        });
        return ndata;
    };

    return (
        <TableContainer className={'tableGeneral'} style={mergeJSON({margin: '0 auto'}, style)}>
            <Grid container spacing={0}>
                    <Grid item className={'tablaIcono'} md={8} xl={8} style={{textAlign:'left', padding: 0}}>
                        {accion.map(ev=>{
                            if(ev.tipo === 'T'){
                                return (<Icon key={'icon'+ ev.icono} className={'icon top ' + ev.color }
                                            onClick={() => {const a = ev.funcion;
                                                a();}}>{ev.icono}</Icon>);
                            }
                        })}
                    </Grid>
                    <Grid item sm={12} md={4} xl={4} style={{ padding: 0}}>
                        {(funciones.search) ?  
                            <TextField 
                                className={'inputGeneral searchTable'}
                                label={"Busqueda"}
                                name={"search"}
                                variant={"standard"}
                                autoComplete={'off'}
                                value={search}
                                onChange={(e)=>{setSearch(e.target.value); setRow((e.target.value === '') ? datos: searchFunction(e.target.value))}}
                            />
                        : null}
                    </Grid>
                </Grid>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            {titulo.map((res, i) => {
                                return <TableCell key={res}>{res}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datos.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    component={"th"}
                                    colSpan={ver.length + accion.length}
                                    style={{textAlign: 'center'}}
                                >
                                    No hay datos registrados
                                </TableCell>
                            </TableRow>
                        ) : (
                            rowsPerPage > 0
                                ? row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : row
                        ).map((res, i) => (
                            <TableRow key={'row' + i}>
                                {ver.map(see => (
                                    <TableCell className={see} key={see + i}>{res[see]}</TableCell>
                                ))}
                                {/*eslint-disable-next-line*/}
                                {accion.map(ev => {
                                    // eslint-disable-next-line
                                    if(ev.tipo === 'B'){
                                        return (<TableCell className={'tablaIcono'} component={"td"} key={'evento' + i +ev.icono}>
                                            <Icon className={'icon ' + ev.color}
                                                  onClick={() => {
                                                      const a = ev.funcion;
                                                      a(res);
                                                  }}>{ev.icono}</Icon>
                                        </TableCell>)
                                    }
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    style={{border:'1px solid #e0e0e0' , borderTop: '0px'}}
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, {label: 'Todos', value: -1}] }
                    count={row.length}
                    labelRowsPerPage="Filas por pág."
                    labelDisplayedRows={({from, to, count}) => to + " de " + count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Box>
        </TableContainer>
    );
}
