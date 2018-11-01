import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://newac.herokuapp.com/sessions/new',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200/dashboard',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '333',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid',

  loginUrl: 'https://newac.herokuapp.com/sessions/new'
}