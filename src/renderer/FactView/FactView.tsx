import { useAsync } from 'react-async-hook';

import { FactDataSource } from '../fact/Fact';
import classes from './FactView.module.css';

interface Props {
  dataSource: FactDataSource;
}

function FactView({ dataSource }: Props) {
  const asyncFact = useAsync(dataSource, []);
  const factText = asyncFact.result?.text;

  return (
    <div className={classes.fact}>
      {asyncFact.loading ? 'Loading...' : <p>{factText}</p>}
    </div>
  );
}

export default FactView;
