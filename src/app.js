import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from '@config';
import webhookRoutes from '@routes/webhookRoutes.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', webhookRoutes);
app.get('/', (req, res) => {
  res.send(`<pre>Nothing to see here. Checkout README.md to start. </pre>`);
});

app.listen(config.PORT, () => {
  console.log(`Server is running ✅ on port: ${config.PORT}`);
});

