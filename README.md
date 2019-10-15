# RBI Consumer Technology: Tech Interview Challenge

In this challenge you will build a basic React application that lets a customer view the menu at a restaurant.

## Initial Setup

1. Run `npm install` or `yarn`
2. Run `npm start` or `yarn start`
3. Open your browser to [localhost:3000](http://localhost:3000)

## General Guidelines

The goal of this challenge is to complete the requirements below while maintaining good code organization and using idiomatic React patterns. We don't expect perfect code, but we do want to see _some_ consideration for a quality React application.

We don't want you to spend too much time on this -- **we expect you to be able to complete the requirements in 2-4 hours**. Overall we're looking for a jumping off point to have a conversation about your thinking and approach rather than a production-ready application.

- Reference the [`EngineeringInterviewDesigns`](./EngineeringInterviewDesigns.pdf) PDF for a general idea on the UI we expect. The design is up to you, but the Burger King UI on the last page is _roughly_ the layout we're looking for.
- The UI should look presentable, but we don't expect you to be a designer. Prefer a well-working application over design.
- Use any external packages you think would be helpful.
- Tests are not required.

## Requirements

1. At the top of the page display a navigation bar containing the sections from the menu. These should be displayed horizontally with their respective carousel image and name. The content for this menu should be fetched from the API (see below for API data).

2. Below the navigation bar show a grid of all the elements within the current selection. The cards should be in a 3-column layout, one item per column.
   1. If the user is on the main menu the elements should be the same as the top navigation bar.
   2. If the user has selected a section then it should be of all the items belonging to the selected section.

3. Each section in the top menu should be clickable, and when clicked the tiles should reflect the items that belong to the selected section. The selected section in the navigation bar should be styled in some way to indicate that it is the active filter.

4. The user should be able to navigate their browsing history and be able to go backwards and forwards through the sections they have viewed. 

## API Data

A separate Express server will be started when you run `npm|yarn start` that acts as your API. During development you can hit this server from your React application by making requests to `/api/..` (ex: `fetch('/api/menu')`).

The data you'll fetch is probably more obtuse than you're used to -- we want to see how you'd handle difficult API response constraints. There is more data in the returned JSON than is necessary to complete this exercise.

There are three entity types you'll be dealing with:

#### `Menu`

- `GET /api/menu`

The menu dictates what shows up in the top nav. It holds a list of references to `Section` objects, which in this case are the individual options to be shown in the nav.

#### `Section`

- `GET /api/sections`

For the purposes of this exercise you can treat a section like a category (`"Combo Meals", "Beverages", "Salads", etc.`). Each section holds a list of references to `Item` objects.

#### `Item`

- `GET /api/items`

An item is the thing that you would order at the counter: `"Double Whopper", "Coffee", "French Fries"`.

## Images

When showing images for the menu sections and the items you'll need to pull the image name from the API data and use it to render the image found at `/images/:imageID`.
