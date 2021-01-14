import axios from 'axios';

export class Server {
  _url:string;
  constructor(url:string) {
    this._url = url;
  }
  
  url():string {
    return this._url;
  }

  async createAccount(account:Account) {
    const url = this.url() + "/accounts/";
    const resp = await axios.post(url, account.json(), {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
    });
    return resp;
  }
}

export class Account {
  _name:string;
  constructor(name:string) {
    this._name = name;
  }

  json() {
    return {
      name:this._name
    }
  }

  save(server:Server) {
    return server.createAccount(this);
  }
}