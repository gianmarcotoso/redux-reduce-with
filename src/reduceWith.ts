import { IMutatorMap } from './contracts/IMutatorMap'
import { Action } from 'redux'

function reduceWith<S, A>(mutators: IMutatorMap<S, A>, defaultState: object) {
	return function(state: object = defaultState, action: Action) {
		const mutator = mutators[action.type]

		if (!mutator) {
			return state
		}

		if (mutator instanceof Function) {
			return mutator.call(null, state, action)
		}

		const mutations = Object.keys(mutator).reduce((r: any, n) => {
			r[n] =
				mutator[n] instanceof Function
					? mutator[n].call(null, action, state)
					: mutator[n]

			return r
		}, {})

		return { ...state, ...mutations }
	}
}

export { reduceWith }
