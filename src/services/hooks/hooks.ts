import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { TAppDispatch, TRootState } from '@store';

export const useAppDispatch: () => TAppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<TRootState> = selectorHook;
