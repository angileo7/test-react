import React, {useEffect, useState} from 'react'
import {TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Typography,} from "@material-ui/core";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectContacts,
  deleteAsync,
  getAllAsync
} from './contactSlice'
import Pagination from "@material-ui/lab/Pagination";
import usePagination from "../../../utility/pagination";
import {Link} from "../../components/Link";
import Button from "@mui/material/Button";

function Counter() {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector(selectContacts)
  let [page, setPage] = useState(1);
  let [items, setItems] = useState(contacts);
  const PER_PAGE = 4;
  const columns = ["First Name", "Last Name", "Email", "Actions"];
  const count = Math.ceil(contacts.length / PER_PAGE);
  const _DATA = usePagination(contacts, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    dispatch(getAllAsync())
    setItems(contacts)
  }, [contacts]);
  const deleteContact = (id: string) => {
    dispatch(deleteAsync(id));
  };
  return (
    <div>
      <TableContainer >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                  <TableCell key={column} >
                    <Typography variant="h6">{column}</Typography>
                  </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(PER_PAGE > 0 ? items.slice(
                (Number(page) - 1) * PER_PAGE,
                (Number(page) - 1) * PER_PAGE + PER_PAGE,):        items).map(dataRow => {
              return (
                  <TableRow key={dataRow._id}
                            hover>
                    <TableCell >
                      {dataRow.firstName}
                    </TableCell>
                    <TableCell align="left">
                      {dataRow.lastName}
                    </TableCell>
                    <TableCell align="left">
                      {dataRow.email}
                    </TableCell>
                    <TableCell align="left">
                      <Link href={`/contacts/edit/${dataRow.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                      <Button variant="contained" color={"warning"} onClick={() => deleteContact(dataRow.id)}>
                             <span>Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
      />
    </div>
  )
}

export default Counter
