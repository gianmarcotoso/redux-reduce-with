# reduce-with

A small library to write Redux reducers as objects instead of using switch statements.

## Why?

I don't like switch statements!

## Installation

`npm install redux-reduce-with --save`

## How does it work?

To write a reducer with `redux-reduce-with` you simply define an object where the keys are your
action types and the values for those keys are _mutators_; these can be either functions or objects.

A _mutator function_ is a **pure** function that receives the current `state` and the current
`action` and returns the new value for the state.

A _mutator object_ is an object where each key is a key within the state that you want to mutate,
and the value for that key is a function which receives the current `action` and, as a second
parameter, the `state`. The value for the key can also be an immediate value if you don't need to
compute anything.

A simple example:

```
// We import the library
import { reduceWith } from 'redux-reduce-with'

// We import our action types
import {
    LOADING_START,
    LOADING_STOP,
    LOADING_CANCEL
} from './ActionTypes'

// We define our mutators object
const mutators = {
    // We can mutate the whole state with one function,
    // as long as we return the whole state
    [LOADING_START]: (state, action) => {
        return {
            ...state,
            isLoading: true,
            loading: state.loading + 1
        }
    },

    // We can also mutate certain keys, setting them directly
    [LOADING_STOP]: {
        loading: (action, state) => state.loading - 1,
        isLoading: (action, state) => (state.loading - 1) === 0 ? false : true
    },

    // We can also directly set an immediate value for a
    // specific key, or more than one of them
    [LOADING_CANCEL]: {
        loading: 0,
        isLoading: false
    }
}

// We wrap our mutators object, along with a default state, with reduceWith and export it.
// The exported value will be a regular reducer function!
export default reduceWith(mutators, { loading: 0, isLoading: false })
```

## License

MIT
