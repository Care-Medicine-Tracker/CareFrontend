import React, { Component } from 'react';
import { config } from '../config';
import { PublicClientApplication } from '@azure/msal-browser';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { MedicineInventory } from './MedicineInventory';
import { UserMedicineInventory } from './UserMedicineInventory';
import { ApplicationPaths } from './Constants';

export class Login extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    };
    this.login = this.login.bind(this)
    // Initialize the MSL application object
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }
  async login()
  {
    try
    {
      //login via popup
      await this.publicClientApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        }
      );
      this.setState({ isAuthenticated: true })
    }
    catch (err)
    {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err
      })
    }
  }

  logout()
  {
    this.publicClientApplication.logoutPopup();
  }
  static displayName = Login.name;

  render()
  {
    return (
      <div>
        {this.state.isAuthenticated ?
          <Layout>
            <Route exact path='/' component={Home} />
            <Route path={ApplicationPaths.MedicineInventoryPath} component={MedicineInventory} />
            <Route path={ApplicationPaths.UserMedicineInventoryPath} component={UserMedicineInventory} />
          </Layout> :
          // <Layout>
          //   <Route exact path='/' component={Home} />
          // </Layout> :
          <div>
            <p>
              <button onClick={() => this.login()}>Login</button>
            </p>
            <h1>Care Economy</h1>
            <p>Welcome to the Care Economy website, a cloud native virtual economy system.</p>
          </div>}
      </div>
    );
  }
}
