import { createStore } from 'redux'
import { IMutator, IMutatorMap } from 'contracts'
import { reduceWith } from './reduceWith'

enum MockCounterActions {
	Increment = 'MockCounter@Increment',
	Decrement = 'MockCounter@Decrement',
	Reset = 'MockCounter@Reset'
}

interface MockCounterState {
	count: number
}

interface MockCounterAction {
	type: string
	payload?: any
}

const DefaultState: MockCounterState = {
	count: 0
}

const mutators: IMutatorMap<MockCounterState, MockCounterAction> = {
	[MockCounterActions.Increment]: (state, action) => {
		return {
			...state,
			count: state.count + 1
		}
	},
	[MockCounterActions.Decrement]: {
		count: (action: MockCounterAction, state: MockCounterState) =>
			state.count - 1
	},
	[MockCounterActions.Reset]: {
		count: DefaultState.count
	}
}

describe('reduceWith', () => {
	it('creates a valid reducer', () => {
		const reducer = reduceWith(mutators, DefaultState)
		const store = createStore(reducer)

		expect(store.getState().count).toBe(0)
	})

	it('correctly handles an action reduced with a mutator function', () => {
		const reducer = reduceWith(mutators, DefaultState)
		const store = createStore(reducer)

		store.dispatch({
			type: MockCounterActions.Increment
		})

		expect(store.getState().count).toBe(1)
	})

	it('correctly handles an action reduced with a mutator object', () => {
		const reducer = reduceWith(mutators, { count: 10 })
		const store = createStore(reducer)

		store.dispatch({
			type: MockCounterActions.Decrement
		})

		expect(store.getState().count).toBe(9)
	})

	it('correctly handles an action reduced with a mutator object with an immediate value', () => {
		const reducer = reduceWith(mutators, DefaultState)
		const store = createStore(reducer)

		store.dispatch({
			type: MockCounterActions.Increment
		})

		store.dispatch({
			type: MockCounterActions.Reset
		})

		expect(store.getState().count).toBe(0)
	})
})
