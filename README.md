# Chatbot - Publications

Chatbot developed to help users search publications related to user defined key words and other specific criteria (ex.: number of citations, publication year and open access).

[(Short demo video)](https://www.loom.com/share/11089772e7314d2b89338ef85fe22ebe?sid=60861d53-1f82-4494-b06a-7cec45191ec4)

## Technologies:
 - TypeScript
 - React
 - Material UI 
 - OpenAI, Zod and Langchain
 - OpenAlex API
 - Axios
 - Vitest, React Testing Library, JSDOM
 - EsLint, Prettier

 ## Main Features:
 - Users can interact with the app in a conversational format, indicating search terms and specific criteira for filtering searches.
 - The message sent by the user is interpreted with the help of GPT-4o-mini model from OpenAI. 
 - Based on the received message, a URL structure compatible with the OpenAlex API is generated, translating user's requirements. If the message is well understood, the model generates a query that is used to make a request to OpenAlex API, which responds with a list of publications that meet the specified criteria. If the message is unclear, further clarifications are requested.
 - The list of publications is rendered within the assistant's message. Each publication card includes its main information and users can click on the title to access the DOI link, view the details and copy the information to the clipboard if desired.
 - 25 publications are shown at a time, ordered by score in descendant order. Users can also load more publications, including those from searches presented in previous messages.

## Project Structure:
Files were grouped by type and feature. This structure is straightforward and intuitive, however, the logic of a feature may be within different folders.
```
  └── src/
      ├── assets/                          
      │   └── icons   
      ├── components/
      │   ├── chat-messages/
      │   │   ├── AiMessage.tsx
      │   │   ├── index.tsx                  
      │   |   └── UserMessage.jsx
      │   ├── publications/
      │   │   ├── index.jsx                  
      │   │   ├── PublicationAbstract.tsx
      │   |   └── PublicationAuthors.tsx
      │   ├── user-input/
      │   |   └── UserInput.tsx
      │   ├── Chatbot.tsx                   
      │   └── Header.tsx
      ├── hooks/
      │   ├─ useAiMessageHandler.ts          
      │   ├─ useCopyToClipboard.ts          
      │   └─ useUserFirstTyping.ts        
      ├── styles/
      │   ├── theme.ts
      │   └── index.css
      ├── tests/
      │   ├── setup.ts
      │   └── testData.ts
      ├── types/
      │   ├── mui.extended.d.ts
      │   └── types.d.ts                          
      ├── utils/
      │   ├── abstract.ts
      │   ├── ai.ts
      │   ├── authorsList.ts
      │   ├── index.ts
      │   ├── mapPublication.ts
      │   └── requestResults.ts
      ├── App.jsx
      └── main.jsx
```

## Some notes:
- Langchain was used to manage prompts and integrate with OpenAI API.
- Zod was used to set the schema, ensuring that data sent to OpenAI API follows a specific format.

## Next steps:
- Requests to OpenAI API are currently made in the Frontend to showcase the functionality. However, these requests should be made from the Backend, due to sercurity concerns, such as exposing the API Key, as well as performance issues, among others. This will be addressed in a future enhancement to set up a server and move this functionality to the backend code.
- Split components: break down components into smaller ones, encapsulating their own funcionalities, for better reusability and easier testing. Enhance cohesion and loose coupling. 
- Testing: Unit tests were performed using Vitest. Current test coverage is around 50% (task not completed). Next step would be increasing coverage to around 70%-90% and perform end-to-end tests using Cypress.
- State management: recognizing that using useContext to store the history and loading state is a better solution in this case, it will be implemented accordingly. 

## Setup project (with Docker):

Clone repository:

```bash
git clone https://github.com/fatimampg/chatbot-openai-openalex.git
```


Create .env file (or directly add the env variable while running the container):

```
VITE_OPENAI_API_KEY=XXXXXXXX
```


Build Docker image:

```docker
docker build . --tag chatbot
```

Run Docker container:

```docker
docker run --init --publish 9080:80 --rm --name chatbot --env-file .env chatbot
```


Available on : http://localhost:9080/