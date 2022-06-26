module.exports = {
  type: 'postgres',
  logging: true,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/src/api/**/domain/entities/*.entity.ts'],
  synchronize: true,
  cli: {
    entitiesDir: 'entities',
  },
};
