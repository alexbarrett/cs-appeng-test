import clsx from 'clsx';
import { ReactNode } from 'react';
import { AsyncState } from 'react-async-hook';

import { Fact } from '../fact/Fact';
import classes from './FactView.module.css';
import Loader from '../Loader/Loader';

interface Props {
  fact: AsyncState<Fact>;
  isFavorite?: boolean;
  onDismiss?: () => void;
  onFavorite?: (fact: Fact) => void;
}

function FactView({ fact, isFavorite = false, onDismiss, onFavorite }: Props) {
  let factContent: ReactNode = fact.result?.text;
  if (fact.loading) {
    factContent = <Loader />;
  } else if (fact.error) {
    factContent =
      'A problem was encountered when researching interesting facts about cats.';
  }

  return (
    <div className={classes.container}>
      <div className={classes.fact}>{factContent}</div>
      <ul className={`${classes.actions} material-symbols-rounded`}>
        <li>
          <button
            type="button"
            title="Dismiss"
            disabled={fact.loading}
            className={classes.actionDismiss}
            onClick={() => {
              onDismiss?.();
            }}
          >
            close
          </button>
        </li>
        <li>
          <button
            type="button"
            title="Favourite"
            disabled={fact.loading || Boolean(fact.error)}
            className={clsx(
              classes.actionFavorite,
              isFavorite && classes.isFavorite,
            )}
            onClick={() => {
              if (fact.result) {
                onFavorite?.(fact.result);
              }
            }}
          >
            favorite
          </button>
        </li>
      </ul>
    </div>
  );
}

export default FactView;
