## AI Snippet

### Prerequisites

- Node.js 22+
- MongoDB 4
- Docker
- OpenAI API Key

### Installation

#### Local Setup

1. Clone the repository
2. Install API dependencies:
   ```bash
   cd api
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   DATABASE_URL=mongodb://localhost:27017/ai-snippet
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Install UI dependencies:
   ```bash
   cd ../ui
   npm install
   ```
5. Create a `.env` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

#### Docker Setup

1. Ensure Docker and Docker Compose are installed
2. Create the API `.env` file as described above
3. Run:
   ```bash
   docker-compose up --build
   ```

### Environment Variables

#### API

**Required**

- `DATABASE_URL`: MongoDB connection string
- `OPENAI_API_KEY`: OpenAI API key for generating summaries

**Optional**

- `PORT`: Server port (default: 8080)
- `LOG_LEVEL`: Logging level (default: "debug")
  - Options: error, warn, info, http, verbose, debug, silly
- `DB_MAX_POOL_SIZE`: MongoDB max connection pool size (default: 10)
- `DB_MIN_POOL_SIZE`: MongoDB min connection pool size (default: 1)
- `DB_SOCKET_TIMEOUT_MS`: MongoDB socket timeout (default: 45000)
- `DB_SERVER_SELECTION_TIMEOUT_MS`: MongoDB server selection timeout (default: 5000)

#### UI

- `NEXT_PUBLIC_API_URL`: API URL

### Obtaining OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or log in
3. Navigate to API Keys section
4. Generate a new secret key
5. Copy the key and use it in the `OPENAI_API_KEY` environment variable

### Running Tests

```bash
cd api
npm test
```

### API Endpoints

#### Create Snippet

- **URL**: `/api/snippets`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "text": "Your code snippet text"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "_id": "snippet_id",
      "text": "Your code snippet text",
      "summary": "AI-generated summary"
    }
    ```
- **Error Responses**:
  - **Code**: 400 (Invalid input)
  - **Code**: 500 (Server error)

#### Get Snippet by ID

- **URL**: `/api/snippets/:id`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "_id": "snippet_id",
      "text": "Your code snippet text",
      "summary": "AI-generated summary"
    }
    ```
- **Error Responses**:
  - **Code**: 404 (Snippet not found)
  - **Code**: 400 (Invalid ID format)

#### Get All Snippets

- **URL**: `/api/snippets`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    [
      {
        "_id": "snippet_id_1",
        "text": "First snippet text",
        "summary": "First snippet summary"
      },
      {
        "_id": "snippet_id_2",
        "text": "Second snippet text",
        "summary": "Second snippet summary"
      }
    ]
    ```

### Improvements 

API:
- Treat LLM response
- Define min quantity of words for summarization
- Filter snippets by date or period
- Unit tests
- Authentication (sign up, sign In)
- User Roles
- Github Actions
- AI summary with SSE
- Add features: delete and edit snippets, search by content

UI: 
- Add pagination to list of snippets
- Automated tests
- Add Favicon
- Make it mobile-friendly 
- Replace CSS inline with classes  
- Notification on successful / failed snippet creation

### Trade-offs

- Usage of Next instead of Remix due to learning curve
- Tailwind: quicker development, but with more cluttered files
- Test with in-memory Mongo: isolation and simulates mongo, however uses a lot of RAM memory
- Singleton for Logger and DB connection: single instance, but they are immutable after initialization

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
