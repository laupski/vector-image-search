import weaviate from 'weaviate-ts-client';
import * as fs from 'fs';
import * as path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

const schemaConfig = {
  'class': 'Meme',
  'vectorizer': 'img2vec-neural',
  'vectorIndexType': 'hnsw',
  'moduleConfig': {
    'img2vec-neural': {
      'imageFields': [
        'image'
      ]
    }
  },
  'properties': [
    {
      'name': 'image',
      'dataType': ['blob']
    },
    {
      'name': 'text',
      'dataType': ['string']
    },
    {
      'name': 'name',
      'dataType': ['string']
    },
    {
      'name': 'extension',
      'dataType': ['string']
    }
  ]
}

await client.schema
  .classCreator()
  .withClass(schemaConfig)
  .do();

const imgDirPath = path.join(__dirname, 'img');
const files = fs.readdirSync(imgDirPath);

// Currently limited to .jpeg, .webp, .png
files.forEach((file) => {
  const filePath = path.join(imgDirPath, file);
  console.log(filePath);
  console.log(file);
  const fileExt = path.extname(file).toLowerCase().substring(1);
  console.log(fileExt);
  const data = fs.readFileSync(filePath).toString('base64');

  client.data.creator()
    .withClassName('Meme')
    .withProperties({
      image: data,
      text: filePath,
      extension: fileExt,
      name: file
    })
    .do()
    .catch((err) => {
      console.log(err + " on " + file)
    });
});
