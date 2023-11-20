import clsx from 'clsx';
import { AsyncState } from 'react-async-hook';

import { Fact } from '../fact/Fact';
import classes from './FactView.module.css';
import Loader from '../Loader/Loader';

interface Props {
  fact: AsyncState<Fact>;
  isFavorite: boolean;
  onDismiss?: () => void;
  onFavorite?: (fact: Fact) => void;
}

function FactView({ fact, isFavorite = false, onDismiss, onFavorite }: Props) {
  const factText = fact.result?.text;

  return (
    <div className={classes.container}>
      <div className={classes.fact}>{fact.loading ? <Loader /> : factText}</div>
      <ul className={`${classes.actions} material-symbols-rounded`}>
        <li>
          <button
            type="button"
            title="Dismiss"
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
