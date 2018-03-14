import { MutatorFunction } from '../types/MutatorFunction'
import { MutatorObject } from '../types/MutatorObject'

type IMutator<S, A> = MutatorFunction<S, A> | MutatorObject<S, A>

export { IMutator }
