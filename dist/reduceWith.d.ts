import { IMutatorMap } from './contracts/IMutatorMap';
import { Action } from 'redux';
declare function reduceWith<S, A>(mutators: IMutatorMap<S, A>, defaultState: object): (state: object, action: Action) => any;
export { reduceWith };
