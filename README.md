### 🧱 BUILT WITH

This project was built using these technologies:

- **Next.js** (with app folder for routing)
- **TypeScript**
- **React Context** (for state management)
- **Axios**
- **Zod** (for schema validation and form type safety)
- **Radix-UI** (for accessible and customizable UI components)
- **SASS** (for custom styling)


### ✨ FEATURES

- **TypeScript Interfaces**: Defined TypeScript interface models to ensure type-safe requests.
- **Next.js App Folder**: Utilized Next.js app folder for efficient routing and page setup.
- **Radix-UI Components**: Integrated Radix-UI for accessible, customizable UI components, with SASS for custom styling.
- **State Management**: Implemented React Context for managing app-wide state efficiently.
- **Type-Safe Forms**: Used Zod for schema validation, ensuring form inputs are correctly typed, with error handling. An option for "letters only" input functionality has been commented out for flexibility.
- **Delete Functionality**: Added functionality to delete prompt sets from the UI.
- **Middleware Implementations**:
  - **API Route Protection**: Middleware that denies access to blacklisted API routes.
  - **Results Page Check**: Middleware that checks if the results page has data, and redirects to the homepage if none exists.


### 🖼️ GENERATION PROCESS

On the main page, users can submit a form to initiate an image generation request. Upon submission, the form data is managed using **React Context**, ensuring that it is accessible throughout the application. This centralized data management allows the `/results` page to retrieve the form data and send a request to the API for fetching the generated images.

Upon receiving the form data, the `processRequest(artRequestForm)` function is invoked. Within this function, a conditional check determines the production type based on the `artRequestForm.production` value. The function handles two cases:

- `if (artRequestForm.production === "queue")`: Processes requests sequentially, sending one request at a time and displaying the images in the order they are received to enhance user experience.
- `else if (artRequestForm.production === "bulk")`: Manages bulk requests, allowing multiple requests to be processed in parallel.

This approach ensures that each production type is handled efficiently, optimizing the user experience accordingly.


### 📡 API DOCUMENTATION

#### 1. **processBulk**

The "processBulk" API handles bulk art requests, allowing multiple images to be generated in one go. It accepts a JSON payload with an art request and the bulk amount of images to generate.

##### IMPORTANT NOTE FOR PARALLEL PROCESSING:

```json
{
  "error": "already generating image"
}
```

This response is from the Artaist's API when `await Promise.all(requests)` is used for parallel processing. It is restricted due to the Artaist API's limitation on handling concurrent requests. However, a rate limiter has been implemented to facilitate sequential processing. If you wish to enable concurrent requests, you can adjust or remove this limiter as needed.

```typescript
const limit = pLimit(1); // Disable for parallel production.
const requests = artRequests.map((artRequest: ArtRequest) =>
    limit(() => axios.post(publicEnv.ARTAIST_API!, artRequest)) // Delete this.
    // axios.post(publicEnv.ARTAIST_API!, artRequest) // Add this.
);
```

#### 2. **processQueue**

The "processQueue" API handles one art request at a time, allowing individual images to be generated in order. It accepts a JSON payload with an art request for the image to be generated.

Upon receiving each art response, the `images` state is updated with the new data. The `responseData` is used to populate the state as follows:

```typescript
responseData && setImages(prevImages => {
    const updatedImage = {
        ...responseData,
        prompt: promptSet.prompt,
        style: promptSet.style
    };

    // Replaces the loading placeholder item with the newly received image.
    return prevImages.map(
        (loading, imageIndex) => (
            imageIndex === i
                ? image
                : loading
        ));
});
```



## 📝 NOTES
- **Vercel.com**, the hosting service for this project, imposes a maximum execution time of 60 seconds for Serverless Functions. If a request exceeds this time limit, it may not complete or be processed successfully.
- The **Artaist** API does not return the style string associated with the request. However, I have ensured that the style is displayed by referencing the original request.
- The process of changing the stack from **ViteJS** to **NextJS** required significant time and effort, which delayed the project’s completion. If not for this change, the project could have been delivered a day earlier.
- **UI Issue**: When a prompt set is deleted, any warning associated with the deleted prompt may be inherited by newly added prompts if they occupy the same index. This issue is likely due to **Radix-UI** not revalidating the form after the deletion.