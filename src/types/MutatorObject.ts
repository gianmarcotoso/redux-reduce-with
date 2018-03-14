import { MutatorObjectFunction } from './MutatorObjectFunction'

export type MutatorObject<S, A> = {
	[key: string]: MutatorObjectFunction<S, A> | any
}
