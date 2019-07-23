# Ioled web app

## Mount GCP for production environment.

### Create a Project and enable google oauth API.

- Go to [Google Console](https://console.cloud.google.com/).
- Create a new project.
- Access to API & services.
- Enable Google+ api.
- Create credential for 'Web Browser' (JS).
- Add authorized origins
- Set the variables "Google Client ID" and the "Client Secret" in the ENV variables.

### Production deployment in Google App Engine.

- Authorize gcloud to access the Cloud Platform with Google user credentials.

```
gcloud auth login
```

- Set the current project

```
gcloud config set project PROJECT-NAME
```

- Deploy the app

```
gcloud app deploy 
npm run deploy-prod
```

- Create iot core regisitry.
```
gcloud iot registries create ioled-devices --project=ioled-production --region=us-central1
```