import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MedicineInventory } from './components/MedicineInventory';
import { UserMedicineInventory } from './components/UserMedicineInventory';
import { ApplicationPaths } from './components/Constants';

import './App.css'

export default class App extends Component
{
  static displayName = App.name;

  render()
  {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path={ApplicationPaths.MedicineInventoryPath} component={MedicineInventory} />
        <Route path={ApplicationPaths.UserMedicineInventoryPath} component={UserMedicineInventory} />
      </Layout>
    );
  }
}
