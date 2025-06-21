import { useAppSelector } from '@hooks';

import styles from './constructor-page.module.css';

import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@components/ui';
import { FC } from 'react';
import { selectIngredientsLoading } from '@selectors/ingredients-product';

export const ConstructorPage: FC = () => {
  // Берём состояние загрузки ингредиентов из стора
  const isIngredientsLoading = useAppSelector(selectIngredientsLoading);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
