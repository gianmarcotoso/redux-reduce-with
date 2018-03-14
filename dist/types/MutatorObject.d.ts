import { MutatorObjectFunction } from './MutatorObjectFunction';
export declare type MutatorObject<S, A> = {
    [key: string]: MutatorObjectFunction<S, A> | any;
};
