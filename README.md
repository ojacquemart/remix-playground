# Remix Playground 💿

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Then, copy/paste the `.env.example` to `.env`. This `.env` file should remain in the git ignore files.

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

## I18N

The `/app/i18n/messages` folder contains the translation files.

The application supports two languages: English and French.

The `lang` cookie contains the user's language preference. The route `?lng={lang}` can be used to change the language.

## Resources

- [Remix Docs](https://remix.run/docs)
- [Tailwind CSS](https://github.com/remix-run/examples/tree/main/tailwindcss)
- [Iosevka Web Font](https://github.com/be5invis/Iosevka)
