declare module 'redux-mock-store' {
    import { Store } from 'redux';
    export default function configureStore(middlewares?: any[]): (state?: any) => Store;
  }