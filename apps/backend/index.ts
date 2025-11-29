import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.post('workflow', async (req: Request, res: Response) => {

});

app.post('/workflow', async (req: Request, res: Response) => {

});

app.put('/workflow/:id', async (req: Request, res: Response) => {

});

app.get('/workflow/executions/:workflowId', async (req: Request, res: Response) => {

});

app.post('/workflow/credentials', async (req: Request, res: Response) => {

});

app.listen(process.env.PORT || 3000); 