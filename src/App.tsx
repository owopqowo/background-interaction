import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './app.module.css';

function App() {
  const type = ['flower', 'butterfly', 'bee'] as const;
  const [checkboxes, setCheckboxes] = useState({
    flower: true,
    butterfly: false,
    bee: false,
  });
  const checkboxesRef = useRef(checkboxes);
  const NUM_FLOWER = 30;
  const NUM_BUTTERFLY = 4;
  const NUM_BEE = 5;
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckboxes((prev) => ({ ...prev, [id]: checked }));
  };

  const randomDuration = (minTime: number, maxTime: number, baseSize: number, isWidthBased: boolean) => {
    const size = isWidthBased ? window.innerWidth : window.innerHeight;
    const ratio = size / baseSize;
    const timeRange = (maxTime - minTime) * ratio;
    return minTime + timeRange * Math.random();
  };

  const createFlower = useCallback(() => {
    const flower = document.createElement('img');
    flower.src = './flower.svg';
    flower.classList.add(styles.flower);

    const size = Math.random() * (20 - 10) + 10;
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.animationDuration = `${randomDuration(10, 20, 740, false)}s`;
    flower.style.animationDelay = `${Math.random() * 20}s`;
    flower.style.setProperty('--random-x', `${Math.random() * 50 - 25}px`);
    flower.style.setProperty('--random-rotate', `${Math.random() * 360}deg`);

    backgroundRef.current?.appendChild(flower);

    flower.addEventListener('animationend', () => {
      flower.remove();

      if (!checkboxesRef.current.flower) return;
      createFlower();
    });
  }, []);

  const createBee = useCallback(() => {
    const bee = document.createElement('span');
    const beeImg = document.createElement('img');
    beeImg.src = './bee-animated.svg';
    bee.classList.add(styles.bee);

    const startTop = Math.random() * 60;
    bee.style.top = `${startTop}%`;
    bee.style.left = '-40px';
    beeImg.style.animationDuration = `${randomDuration(10, 15, 360, true)}s`;
    beeImg.style.animationDelay = `${Math.random() * 15}s`;
    beeImg.style.setProperty('--random-y', `${Math.random() * (30 - 10) + 10}px`);
    beeImg.style.setProperty('--random-x', `${window.innerWidth + 80}px`);
    beeImg.style.setProperty('--direction', '1');

    bee.appendChild(beeImg);
    backgroundRef.current?.appendChild(bee);

    bee.addEventListener('animationend', () => {
      bee.remove();

      if (!checkboxesRef.current.bee) return;
      createBee();
    });
  }, []);

  const createButterfly = useCallback(() => {
    const butterfly = document.createElement('span');
    const butterflyImg = document.createElement('img');
    butterfly.classList.add(styles.butterfly);
    butterflyImg.src = './butterfly-animated.svg';

    const startTop = Math.random() * 60;
    butterflyImg.style.top = `${startTop}%`;
    butterfly.style.animationDuration = `${randomDuration(8, 10, 360, true)}s`;
    butterfly.style.animationDelay = `${Math.random() * 10}s`;
    butterfly.style.setProperty('--CONTAINER-WIDTH-PX', `${window.innerWidth + 100}`);
    butterfly.style.setProperty('--r', `${Math.random() * (10 - 5) + 5}`);

    butterfly.appendChild(butterflyImg);
    backgroundRef.current?.appendChild(butterfly);

    butterfly.addEventListener('animationend', () => {
      butterfly.remove();

      if (!checkboxesRef.current.butterfly) return;
      createButterfly();
    });
  }, []);

  useEffect(() => {
    checkboxesRef.current = checkboxes;
  }, [checkboxes]);

  useEffect(() => {
    if (checkboxes.flower) {
      for (let index = 0; index < NUM_FLOWER; index++) {
        createFlower();
      }
    }
  }, [checkboxes.flower, createFlower]);

  useEffect(() => {
    if (checkboxes.butterfly) {
      for (let index = 0; index < NUM_BUTTERFLY; index++) {
        createButterfly();
      }
    }
  }, [checkboxes.butterfly, createButterfly]);

  useEffect(() => {
    if (checkboxes.bee) {
      for (let index = 0; index < NUM_BEE; index++) {
        createBee();
      }
    }
  }, [checkboxes.bee, createBee]);

  return (
    <>
      <div className={styles.buttons}>
        {type.map((item) => {
          return (
            <div key={item}>
              <input
                id={item}
                type="checkbox"
                className={styles.checkbox}
                onChange={handleChange}
                checked={checkboxes[item]}
              />
              <label htmlFor={item} className={styles.label}>
                <img src={`./${item}.svg`} alt="" />
              </label>
            </div>
          );
        })}
      </div>

      <div className={styles.background} ref={backgroundRef}></div>
    </>
  );
}

export default App;
