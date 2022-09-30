import dataSource from './data-source';

export const dataSourceToken = 'DATA_SOURCE'
export const databaseProviders = [
  {
    provide: dataSourceToken,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
