import { List, Datagrid, TextField, EditButton } from 'react-admin';

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);