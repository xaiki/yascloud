# YASCLOUD

this is a small hack based on svelte-typescript-template, it has 2 parts, a
svelte app and a python server.

## quickstart
clone and run
```sh
yarn
pipenv install
yarn start &
env FLASK_APP=python/cloud_server.py FLASK_ENV=developement FLASK_DEBUG=1 pipenv run python -m flask run
```

it should get your js app runing on port 8080 and your python server running
on port 5000

## how it works
it's a hack, we hash the text into sha1 and ask for that blob to the python
server, if the file `imgs/${hash}.png` exist we send that, if not we
generate it from the `POST` data in the API request

# 🚧  Svelte Template

> Svelte + Typescript + Parcel + Express

An easy-to-use Svelte template!

- Allowed to use code splitting in svelte. (code chunk, npm modules.. dynamic import.. code split... whatever)

![Svelte Is Awesome GIF](https://i.imgur.com/JmY3EHH.gif)



## Command

- npm start

  > Run the development server. This command creates a path accessible through HTTP and HTTPS. HTTP is applied with Hot Module Replacement (HMR). HTTPS has a built-in certificate for testing.

- npm run build

  > Generate production build results. Minify is applied to the result and hmr is excluded.

- npm run watch

  > Same as the npm start command, but does not serve the code with HTTP and HTTPS.

- npm run clean

  > This command deletes all files in the 'dist' folder. However, the folder below the list is not deleted. If there is a static resource that should not be deleted, create a folder in the folder and use it.



## License

MIT Licensed
