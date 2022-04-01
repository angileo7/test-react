import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    IContact,
    saveAsync
} from '../../features/contact/contactSlice'
import { Link } from '../../components/Link';
import {useAppDispatch} from "../../app/hooks";
import Button from "@mui/material/Button";
import styles from "../../styles/Home.module.css";
import {Grid} from "@material-ui/core";

export interface IAddEditProps {
    user: IContact;
}
const AddEdit: React.FC<IAddEditProps> = (props) => {
    const dispatch = useAppDispatch()
    const user: IContact = props?.user;
    const isAddMode: boolean = !user;

    useEffect(() => {
        if(!isAddMode)
            reset({
                ...user
            })
    }, [user]);
    // form validation rules
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        phone: Yup.string()
            .required('phone is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data: IContact) => dispatch(saveAsync(data));

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/">Go to listing</Link>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{isAddMode ? 'Add Contact' : 'Edit Contact'}</h1>
                <div className="form-row">
                    <div className="form-group col-5">
                        <label>First Name: </label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Last Name: </label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-7">
                        <label>Email: </label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="form-group col">
                        <label>Phone: </label>
                        <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.phone?.message}</div>
                    </div>
                </div>
                <div className="form-group">
                    <br/>
                    <Grid container spacing={4}>
                        <Grid item xs={7}>
                            <Button className={styles.button_separator} type="submit" disabled={formState.isSubmitting} variant="contained" color={"success"}>
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                <span>Save</span>
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Link href="/" >Cancel</Link>
                        </Grid>
                    </Grid>
                </div>
            </form>
            </header>
        </div>
    );
}

export default AddEdit;