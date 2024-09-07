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
const requests = artRequests.map(
  (artRequest: ArtRequest) =>
    limit(() => axios.post(publicEnv.ARTAIST_API!, artRequest)) // Delete this.
  // axios.post(publicEnv.ARTAIST_API!, artRequest) // Add this.
);
```