import { Action } from 'redux'

export type MutatorObjectFunction<S, A> = (action: A, state: S) => S
