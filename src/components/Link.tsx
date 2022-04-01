import NextLink from 'next/link';
import Button from '@mui/material/Button';
export { Link };

function Link({ href, children, ...props }) {
    return (
        <NextLink href={href}>
            <Button variant="contained" color={'primary'} {...props}>{children}</Button>
        </NextLink>
    );
}
