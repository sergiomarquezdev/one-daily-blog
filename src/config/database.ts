import {Pool} from 'pg';
import environment from '../environments/environment';

export const pool = new Pool({
  host: environment.PGHOST || '',
  database: environment.PGDATABASE || '',
  user: environment.PGUSER || '',
  password: environment.PGPASSWORD,
  port: 5432,
  ssl: {rejectUnauthorized: true},
});
