import {useContext} from 'react';
import {SoftContext} from '../hoc/SoftProvider';

export function useSoft(){
    return useContext(SoftContext);
}