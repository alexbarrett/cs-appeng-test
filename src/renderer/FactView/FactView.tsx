import clsx from 'clsx';
import { ReactNode } from 'react';
import { AsyncState } from 'react-async-hook';

import { Fact } from '../fact/Fact';
import classes from './FactView.module.css';
import Loader from '../Loader/Loader';
import ActionButton from '../ActionButton/ActionButton';

interface Props {
  fact: AsyncState<Fact>;
  isFavorite?: AsyncState<boolean>;
  onDismiss?: () => void;
  onFavorite?: (fact: Fact) => void;
}

/**
 * Displays a single fact with buttons to dismiss the fact or add to favorites.
 */
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
          <ActionButton
            symbol="close"
            title="Dismiss"
            disabled={fact.loading}
            className={classes.actionDismiss}
            onClick={() => {
              onDismiss?.();
            }}
          />
        </li>
        <li>
          <ActionButton
            symbol="favorite"
            title={
              isFavorite?.result
                ? 'Remove from favourites'
                : 'Add to favourites'
            }
            disabled={fact.loading || Boolean(fact.error)}
            className={clsx(
              classes.actionFavorite,
              isFavorite?.result && classes.isFavorite,
            )}
            onClick={() => {
              if (fact.result) {
                onFavorite?.(fact.result);
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
}

export default FactView;
