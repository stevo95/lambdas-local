# This code repository is related to my medium article:

Follow the article for step by step tutorial

[Click to view the article](https://medium.com/@stefansarmir/streamlining-development-with-aws-lambda-layers-typescript-and-docker-8de00f6407ae)

## Related commands

### Install dependencies

```
npm install
```

### Build the code

```
npm run build
```

### Start local api network in docker
** Make sure you have SAM installed on your development machine and docker opened **

```
sam local start-api --docker-network local-api-network
```