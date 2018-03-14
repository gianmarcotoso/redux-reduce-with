import { Action } from 'redux'

export type MutatorFunction<S, A> = (state: S, action: A) => S
