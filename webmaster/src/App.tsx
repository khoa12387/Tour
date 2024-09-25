import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './dataProvider';
import authProvider from './authProvider'; // Nhập authProvider của bạn

export const App = () => (
  <Admin
    layout={Layout} // Custom layout component
    dataProvider={dataProvider} // Custom data provider for API integration
    authProvider={authProvider} // Thêm authProvider vào đây
  >
    {/* Define your resources here */}
    <Resource
      name="destinations"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="tours"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="faqs"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="bookings"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="reviews"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);

