# Vector Image Search
PoC of a vector image search. Similar to a reverse image search offered by search engine websites.

## Requirements
- node.JS
- Docker and Docker Compose

## Installation
```
docker-compose up -d
npm i
node seed.js # This seeds the database with all images in the img/ directory
```

## Testing
With the requirements and installation done, you may run `node test.js`. It will return back the closest image as `result.jpg`.

## Cleanup
```
docker-compose down
docker rmi semitechnologies/weaviate
docker rmi semitechnologies/img2vec-pytorch
```

## Notes
This technology is run on using the Image2Vec model: `pytorch-resnet50` \
The closest image is based on the idea of HNSW (Hierarchical Navigable
Small World) graphs. The paper is located at: https://arxiv.org/ftp/arxiv/papers/1603/1603.09320.pdf \
The model was offered by [Weaviate](https://weaviate.io/)
