import helmet from 'helmet';

export default function generic(app) {
  app.use(helmet());
}