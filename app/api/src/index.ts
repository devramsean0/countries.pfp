import express, { Express, Request, Response } from 'express';
import fetch from "node-fetch";
import sharp from "sharp"
const app: Express = express();
const port = 3200

app.get('/', (req: Request, res: Response) => {
    void req
    res.send('API server for countries.pfp');
});

app.get('/generate/:country/:position', (req: Request, res: Response) => {
  var flagimage: any
  ( async () => {
    flagimage = await fetch(`localhost:3201/image/${country}/${position}`);
  })
  const srcImage: any = req.query.image;
  const country = req.params.country;
  const position  = req.params.position;
  const buffer  = Buffer.from(srcImage, "base64");
  sharp(buffer)
  .resize({
    fit: sharp.fit.contain,
    height: 100
  })
  .toBuffer({ resolveWithObject: true }) 
  .then(({data}) => {
    sharp(flagimage)
    .resize(300,300) 
      .composite([{ 
        input: data
      }])
        .toBuffer({ resolveWithObject: true})
        .then(({data}) => {
          res.json({
            buffer: data
          })
          console.log(data)
        })
  })
})
app.listen(port, () => {
  console.log(`⚡️[API] [server]: Server is running at http://localhost:${port}`);
});