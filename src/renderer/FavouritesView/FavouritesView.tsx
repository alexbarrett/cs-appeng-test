import { ReactNode } from 'react';
import { useAsync } from 'react-async-hook';

import { FactStore } from '../FactStore/FactStore';
import classes from './FavouritesView.module.css';
import ActionButton from '../ActionButton/ActionButton';

interface Props {
  factStore: FactStore;
}

function FavoritesView({ factStore }: Props) {
  const allFacts = useAsync(() => factStore.getAll(), []);

  let content: ReactNode;
  if (allFacts.result) {
    content = (
      <ol className={classes.favoritesList}>
        {allFacts.result.map((fact) => (
          <li key={`${fact.source}_${fact.id}`}>
            <p className={classes.fact}>{fact.text}</p>
            <ActionButton
              symbol="heart_minus"
              title="Remove from favourites"
              className="action material-symbols-rounded"
            />
          </li>
        ))}
      </ol>
    );
  }

  return <div className={classes.container}>{content}</div>;
}

export default FavoritesView;
