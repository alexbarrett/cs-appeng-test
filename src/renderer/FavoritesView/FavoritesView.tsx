import { ReactNode } from 'react';
import { useAsync } from 'react-async-hook';

import ActionButton from '../ActionButton/ActionButton';
import { FactStore } from '../FactStore/FactStore';
import classes from './FavoritesView.module.css';
import Loader from '../Loader/Loader';

interface Props {
  factStore: FactStore;
}

/**
 * Displays all facts stored in a `FactStore` with buttons to remove each one.
 */
function FavoritesView({ factStore }: Props) {
  const allFacts = useAsync(() => factStore.getAll(), []);

  let content: ReactNode;
  if (allFacts.loading) {
    content = <Loader />;
  } else if (allFacts.result) {
    content = (
      <ol className={classes.favoritesList}>
        {allFacts.result.map((fact) => (
          <li key={`${fact.source}_${fact.id}`}>
            <p className={classes.fact}>{fact.text}</p>
            <ActionButton
              symbol="heart_minus"
              title="Remove from favourites"
              className={classes.removeFavorite}
              onClick={async () => {
                // TODO: Handle intermediate state before remove action fulfils.
                // A user could, for instance, click the button multiple times
                // before removal is complete.
                await factStore.remove(fact);
                allFacts.execute();
              }}
            />
          </li>
        ))}
      </ol>
    );
  } else {
    content = 'A problem was encountered when loading your favourite facts.';
  }

  return <div className={classes.container}>{content}</div>;
}

export default FavoritesView;
