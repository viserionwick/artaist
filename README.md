React (Vite, TypeScript)
React-Roter-Dom
React Context
Axios
Radix-UI
SASS

- Created a typescript interface model for requests.
- Utilized React-Roter-Dom for routing.
- Implemented Radix-UI and utilized my own SASS styling.
- Implemented React Context for state management across the app.
- Forms are type safe, and each error is handled. Left the option for letters only inputs by commenting out the functionality.
- Added delete functionality to delete a prompt set.


- Unsolved issues:
- UI issue: When a prompt set is deleted, if it had a warning, newly added prompt will have it's warning inherited because it has the same index as the one that was deleted. Probably because Radix-UI doesn't revalidate the form.

- Notes:
- Server didn't return the style string of which the request was sent with. I still managed to display it by reference.