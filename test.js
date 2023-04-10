import weaviate from 'weaviate-ts-client';
import * as fs from 'fs';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});
const test = Buffer.from( fs.readFileSync('./test.jpg') ).toString('base64');

const resImage = await client.graphql.get()
  .withClassName('Meme')
  .withFields(['image'])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

// Write result to filesystem
const result = resImage.data.Get.Meme[0].image;
fs.writeFileSync('./result.jpg', result, 'base64');
