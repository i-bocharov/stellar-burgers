import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '@selectors/user';
import { useAppSelector } from '@hooks';

export const AppHeader: FC = () => {
  const user = useAppSelector(selectUser);

  return <AppHeaderUI userName={user?.name || ''} />;
};
