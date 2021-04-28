import { createTypedHooks } from 'easy-peasy';
import { Model } from './models/loader.model';


const {useStoreActions,useStoreDispatch,useStoreState,useStore} = createTypedHooks<Model>();

export {useStoreActions,useStoreDispatch,useStoreState,useStore};