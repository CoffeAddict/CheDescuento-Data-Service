# CheDescuento Data Service
This repository contains a serverless function deployed on Vercel. The function performs Fetches discount data from specified sources and saves it to a JSON file.

### Deployment

This project is automatically deployed to Vercel. Any changes pushed to the main branch will trigger a redeployment.


## Usage

#### API Endpoint

The function is accessible at:
```
https://<your-vercel-project-name>.vercel.app/api/fetchData
```

#### Environment Variables

The following environment variables are required to run the function:

| Variable Name | Description | Default |
| --- | --- | --- |
| API_URL | The base URL of the API endpoint. | N/A |
| API_USE_MOCKS | A boolean value indicating whether to use mock data or not. | false |
| API_LOOP_COTO_ID | The ID of the Coto Magic Loop Scraper. | N/A |


## Development
- Node.js v16 or higher
- Vercel CLI

### Running Locally
1.	Clone the repository:
```bash
git clone https://github.com/CoffeAddict/CheDescuento-Data-Service.git
```

2.	Install dependencies:
```bash
cd CheDescuento-Data-Service
npm install
```

3.	Create a `.env` file in the root directory of the project and add the following variables:
```bash
API_URL=https://api.example.com/data
API_USE_MOCKS=false
API_LOOP_COTO_ID=loop-coto-id
```

4.	Start the server:
```bash
vercel dev
```

5.	Access the function at:
```bash
http://localhost:3000/api/fetchData
```



## Contributing
Pull requests are welcome.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
