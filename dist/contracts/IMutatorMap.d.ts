import { IMutator } from './IMutator';
interface IMutatorMap<S, A> {
    [key: string]: IMutator<S, A>;
}
export { IMutatorMap };
