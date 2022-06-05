import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = 3201
const b2Addr = "https://countries-pfp.s3.us-west-004.backblazeb2.com/"

app.get('/', (req: Request, res: Response) => {
  void req
  res.send('B2 manager server for countries.pfp');
});

app.get('/image/:country/:position', (req: Request, res: Response) => {
  // TODO: Github Issue #5
  const country = req.params.country;
  const position = req.params.position;
  res.send(`${b2Addr}/countries/${country}/${position}.png`);
})
app.listen(port, () => {
  console.log(`⚡️[API] [b2-manager]: Server is running at https://localhost:${port}`);
});