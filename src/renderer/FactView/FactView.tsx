import clsx from 'clsx';
import { ReactNode } from 'react';
import { AsyncState } from 'react-async-hook';

import { Fact } from '../fact/Fact';
import classes from './FactView.module.css';
import Loader from '../Loader/Loader';

interface Props {
  fact: AsyncState<Fact>;
  isFavorite?: AsyncState<boolean>;
  onDismiss?: () => void;
  onFavorite?: (fact: Fact) => void;
}

function FactView({ fact, isFavorite, onDismiss, onFavorite }: Props) {
  let factContent: ReactNode;
  if (fact.loading || isFavorite?.loading) {
    factContent = <Loader />;
  } else if (fact.error) {
    factContent =
      'A problem was encountered when researching interesting facts about cats.';
  } else {
    factContent = fact.result?.text;
  }

  return (
    <div className={classes.container}>
      <div className={classes.fact}>{factContent}</div>
      <ul className={classes.actions}>
        <li>
          <button
            type="button"
            title="Dismiss"
            disabled={fact.loading}
            className={clsx(
              'action',
              'material-symbols-rounded',
              classes.actionDismiss,
            )}
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
            title={
              isFavorite?.result
                ? 'Remove from favourites'
                : 'Add to favourites'
            }
            disabled={fact.loading || Boolean(fact.error)}
            className={clsx(
              'action',
              'material-symbols-rounded',
              classes.actionFavorite,
              isFavorite?.result && classes.isFavorite,
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
