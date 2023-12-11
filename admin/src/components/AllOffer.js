import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles/AllOrders.scss";
import { Link } from 'react-router-dom';

export const AllOffer = () => {
    // const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     getOrders();
    // }, []);

    // const getOrders = async () => {
    //     const response = await fetch("http://localhost:5000/api/v3/allorders");
    //     const responseData = await response.json();
    //     setOrders(responseData.orders);
    // };

    function createData(name, nameproduct, size, price) {
        return { name, nameproduct, size, price };
    }

    const rows = [
        createData('Ho Duc Phap', 'converse 70s', 41, 200000),
        createData('Le Hoang Hai Dang', 'Mlb linner', 42, 500000),
        createData('Nguyen Van A', 'samba classic', 41, 400000),
        createData('Le Thi B', 'asic Mz', 41, 900000),

    ];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">User Name</StyledTableCell>
                        <StyledTableCell align="right">Product Name</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">Size</StyledTableCell>
                        <StyledTableCell align="right">Desired Price ($)</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((order) => (
                        <StyledTableRow >
                            <StyledTableCell align="right">
                                {order.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{order.nameproduct}</StyledTableCell>
                            <StyledTableCell align="right">100</StyledTableCell>
                            <StyledTableCell align="right">{order.size}</StyledTableCell>
                            <StyledTableCell align="right">{order.price}</StyledTableCell>
                            <StyledTableCell align="center">Accept</StyledTableCell>
                            <StyledTableCell align="center">Decline</StyledTableCell>
                            <StyledTableCell align="center">
                                <Link to="/detailoffer" style={{ textDecoration: 'none' }}>
                                    <p className="detail" style={{ color: "#00008b", hover: { textDecoration: 'underline' } }}>See Detail</p>
                                </Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
