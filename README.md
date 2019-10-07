# VF Crypto

## About

This is SPA React App to monitor to crypto currencies. It's goal was to accomplish a technical exercise, and to showcase my grasp of ReactJS.

It relies on the API [CoinMarketCap](https://coinmarketcap.com/api/) (V1) to supply the data.
The crypto currency icons used are from [https://github.com/atomiclabs/cryptocurrency-icons/]

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Structure

The App has two main screens (Container components), a List of top ranked currencies and a details screen for a selected currency. Those screens will be referred to as Pages. The main source of the state is granted by a state manager: [Redux](https://redux.js.org/).

### The List Page

The list of crypto currencies page has it's data automatically refreshed every 60 seconds. To accomplish this, the first approach was to rely on `setInterval()` method of the DOM Window. Then, this was replaced by Saga Effects. This allowed more flexibility browser independence.

The list can show the corresponding values in several fiat currencies and the columns can be sorted.

### Details Page

The details page relies primarily on a crypto currency existing on the list. Never the less, if the details page address is accessed directly, the page can fetch the data for that currency automatically.

### Other Information

- To accelerate the development, a component library was used: [Material-UI](https://material-ui.com/).

- Most of the components developed from the scratch were styled using [Styled Components](https://www.styled-components.com).

- For performance and encapsulation reasons, most of the data retrieved from the reducers was done using memoized Selectors ([Reselect](https://github.com/reduxjs/reselect)).

## Next Steps

In order to prepare this app for production a few changes need to be made:

- Put all the hard-coded constants (configs and API endpoints) into `.env` files.
- Migrate the API to the next version because the current one is deprecated and it will be discontinued.
- Improve the user experience with notifications when errors occur.
- Allow the conversion to a specific fiat currency of the crypto currency being shown in the details page.
- Have the fiat currency be applied application-wide.
- Add localization (to strings and number formats).
