import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import simpleRestProvider from 'ra-data-simple-rest';

import { PostList } from "./PostList";

const dataProvider = simpleRestProvider('/api/v1');

export const App = () => <Admin dataProvider={dataProvider} layout={Layout}>
    <Resource name="posts" list={PostList} />
</Admin>;
