import { AddEdit } from '../../../components/contacts';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useEffect} from "react";
import {getAsync, selectContact} from "../../../features/contact/contactSlice";

const Page: NextPage = () => {
    const contact = useAppSelector(selectContact)
    const dispatch = useAppDispatch()
    const { query }: NextRouter = useRouter();

    const contactId = query.id as string;

    useEffect(() => {
        dispatch(getAsync(contactId))
    }, []);

    return (
        <AddEdit user={contact}/>
    );
};

export default Page;
