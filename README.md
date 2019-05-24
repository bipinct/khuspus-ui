# Dodo-ui

Client for Dodo server built on Quasar (VueJS)

## Quick Start

Install dependencies

```console
$ npm install
```

### Start developement server

```console
$  quasar dev -m spa
```

app runs at

```console
http://localhost:8080
```

## Build

```console
quasar build -t mat
```

## Build android app

```console
quasar build -m cordova -T android
cd src-cordova
cordova requirements
cordova run android
```

for more build option follow <https://quasar-framework.org/guide/app-build-commands.html>

## Running on production

```console
quasar serve dist/spa-mat --port 8080
```

## References

```console
https://join-monster.readthedocs.io/en/stable/data-model/
https://github.com/stems/join-monster-demo/tree/master/schema-basic
https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
https://vue-apollo.netlify.com/guide/apollo/queries.html#option-function
https://blog.apollographql.com/file-uploads-with-apollo-server-2-0-5db2f3f60675
```

## Demo

```console
https://khuspus.herokuapp.com/
username : amit
password : amit12345
```

TODO :
feed should be in store
