import { TOrder } from 'types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
  handleClose: (id: string) => void;
  disabled: boolean;
};
