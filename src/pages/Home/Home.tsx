import React from 'react';
import shallow from 'zustand/shallow';

import style from './Home.module.scss';

import { useConfigStore } from '#src/stores/ConfigStore';
import type { Content } from '#types/Config';
import ShelfList from '#src/containers/ShelfList/ShelfList';

const Home = () => {
  const { config } = useConfigStore(({ config, accessModel }) => ({ config, accessModel }), shallow);
  const content: Content[] = config?.content;

  return (
    <div className={style.container}>
      <ShelfList rows={content} />;
    </div>
  );
};

export default Home;
