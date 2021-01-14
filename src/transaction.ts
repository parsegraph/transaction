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
    return resp.data.id;
  }

  async deleteAccount(account:Account) {
    if (typeof account.id() !== "number") {
      throw new Error("Account ID must be given");
    }
    const url = this.url() + "/accounts/" + account.id();
    return await axios.delete(url);
  }

  async getAccount(id:number) {
    const resp = await axios.get(this.url() + "/accounts/" + id);
    const {name} = resp.data;
    return new Account(id, name);
  }

  async createCategory(category:Category) {
    const url = this.url() + "/category/";
    const resp = await axios.post(url, category.json(), {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
    });
    return resp.data.id;
  }

  async deleteCategory(category:Category) {
    if (typeof category.id() !== "number") {
      throw new Error("Category ID must be given");
    }
    const url = this.url() + "/category/" + category.id();
    return await axios.delete(url);
  }

  async getCategory(id:number) {
    const resp = await axios.get(this.url() + "/category/" + id);
    const {name} = resp.data;
    return new Category(id, name);
  }}

export class Account {
  _id:number;
  _name:string;
  constructor(id:number, name:string) {
    this._id = id;
    this._name = name;
  }

  id() {
    return this._id;
  }

  name() {
    return this._name;
  }

  json() {
    return {
      id:this._id,
      name:this._name
    }
  }

  async save(server:Server) {
    const id = await server.createAccount(this);
    this._id = id;
    return id;
  }

  async delete(server:Server) {
    return server.deleteAccount(this);
  }
}

export class Category {
  _id:number;
  _name:string;
  _parent:Category;

  constructor(id:number, name:string, parent?:Category) {
    this._id = id;
    this._name = name;
    this._parent = parent;
  }

  id() {
    return this._id;
  }

  name() {
    return this._name;
  }

  parent() {
    return this._parent;
  }

  json() {
    const data = {
      id:this._id,
      name:this._name,
      parent:null as number
    };

    if (this.parent()) {
      data.parent = this.parent().id();
    }

    return data;
  }

  async save(server:Server) {
    const id = await server.createCategory(this);
    this._id = id;
    return id;
  }

  async delete(server:Server) {
    return server.deleteCategory(this);
  }
}