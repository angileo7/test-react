import React, { useState } from 'react'
import {TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Typography,} from "@material-ui/core";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectContacts
} from './contactSlice'
import Pagination from "@material-ui/lab/Pagination";
import usePagination from "../../../utility/pagination";
import {Link} from "../../components/Link";

function Counter() {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector(selectContacts)

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const columns = ["firstName", "lastName", "email",];
  const count = Math.ceil(contacts.length / PER_PAGE);
  const _DATA = usePagination(contacts, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
            {(PER_PAGE > 0 ? contacts.slice(
                (Number(page) - 1) * PER_PAGE,
                (Number(page) - 1) * PER_PAGE + PER_PAGE,):        contacts).map(dataRow => {
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
{/*                      <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                        {user.isDeleting
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : <span>Delete</span>
                        }
                      </button>*/}
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
