import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useEffect, useRef, useState } from 'react';

const SLOT_DATA = [
  '🍒',
  '🍋',
  '🍊',
  '🍉',
  '🍇',
  '🍓',
  '🍈',
  '🍌',
  '🍍',
  '🥝',
  '🍏',
  '🍎',
  '🍐',
  '🍑',
];

// Tick interval is intentionally larger than the picker's effective animation
// duration (~100ms minimum) so each step lands cleanly before the next one starts.
const TICK_MS = 120;
const STOP_TIMES = [1500, 2200, 3000];

type Result = 'idle' | 'spinning' | 'win' | 'lose';

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate(pattern);
  }
}

function SlotMachine() {
  const [values, setValues] = useState([SLOT_DATA[0], SLOT_DATA[1], SLOT_DATA[2]]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Result>('idle');
  const intervalsRef = useRef<number[]>([]);
  const timersRef = useRef<number[]>([]);

  const clearAll = () => {
    intervalsRef.current.forEach((id) => window.clearInterval(id));
    timersRef.current.forEach((id) => window.clearTimeout(id));
    intervalsRef.current = [];
    timersRef.current = [];
  };

  // Cleanup pending timers on unmount.
  useEffect(() => clearAll, []);

  const spin = () => {
    clearAll();
    setSpinning(true);
    setResult('spinning');

    // Mutable index per slot so setInterval doesn't fight stale closures.
    const indices = values.map((v) => SLOT_DATA.indexOf(v));

    indices.forEach((_, slotIndex) => {
      intervalsRef.current[slotIndex] = window.setInterval(() => {
        indices[slotIndex] = (indices[slotIndex] + 1) % SLOT_DATA.length;
        setValues((prev) => {
          const next = [...prev];
          next[slotIndex] = SLOT_DATA[indices[slotIndex]];
          return next;
        });
      }, TICK_MS);
    });

    STOP_TIMES.forEach((stopAt, slotIndex) => {
      timersRef.current[slotIndex] = window.setTimeout(() => {
        window.clearInterval(intervalsRef.current[slotIndex]);
        const finalIdx = Math.floor(Math.random() * SLOT_DATA.length);
        setValues((prev) => {
          const next = [...prev];
          next[slotIndex] = SLOT_DATA[finalIdx];
          return next;
        });
        // Tactile "thud" on every slot landing — silent on desktop browsers.
        vibrate(30);

        if (slotIndex === STOP_TIMES.length - 1) {
          // Wait for the last picker animation to settle before scoring.
          timersRef.current.push(
            window.setTimeout(() => {
              setSpinning(false);
              setValues((prev) => {
                const isWin = prev.every((v) => v === prev[0]);
                setResult(isWin ? 'win' : 'lose');
                if (isWin) {
                  vibrate([0, 60, 80, 60]);
                }
                return prev;
              });
            }, 350)
          );
        }
      }, stopAt);
    });
  };

  const message =
    result === 'win' ? '🎉 Jackpot! 🎉' : result === 'lose' ? 'Try Again!' : 'Place your bet!';

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Paper radius={16} withBorder p={4}>
        <Group gap={4}>
          {values.map((value, index) => (
            <Picker
              key={index}
              w={80}
              loop
              withMask
              data={SLOT_DATA}
              value={value}
              readOnly
              itemHeight={50}
              visibleItems={5}
              withHighlight={false}
              maxBlurAmount={spinning ? 8 : 0}
              maskHeight={20}
              size="32px"
              animationDuration={spinning ? 100 : 300}
            />
          ))}
        </Group>
      </Paper>
      <Button onClick={spin} disabled={spinning} size="md">
        {spinning ? 'Spinning…' : 'Spin'}
      </Button>
      <Text fw={700} c={result === 'win' ? 'teal' : undefined}>
        {message}
      </Text>
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

const SLOT_DATA = ['🍒','🍋','🍊','🍉','🍇','🍓','🍈','🍌','🍍','🥝','🍏','🍎','🍐','🍑'];
const TICK_MS = 120;
const STOP_TIMES = [1500, 2200, 3000];

function vibrate(duration) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate(duration);
  }
}

function Demo() {
  const [values, setValues] = useState([SLOT_DATA[0], SLOT_DATA[1], SLOT_DATA[2]]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('idle');
  const intervalsRef = useRef([]);
  const timersRef = useRef([]);

  const clearAll = () => {
    intervalsRef.current.forEach((id) => clearInterval(id));
    timersRef.current.forEach((id) => clearTimeout(id));
    intervalsRef.current = [];
    timersRef.current = [];
  };

  useEffect(() => clearAll, []);

  const spin = () => {
    clearAll();
    setSpinning(true);
    setResult('spinning');

    const indices = values.map((v) => SLOT_DATA.indexOf(v));

    indices.forEach((_, slotIndex) => {
      intervalsRef.current[slotIndex] = setInterval(() => {
        indices[slotIndex] = (indices[slotIndex] + 1) % SLOT_DATA.length;
        setValues((prev) => {
          const next = [...prev];
          next[slotIndex] = SLOT_DATA[indices[slotIndex]];
          return next;
        });
      }, TICK_MS);
    });

    STOP_TIMES.forEach((stopAt, slotIndex) => {
      timersRef.current[slotIndex] = setTimeout(() => {
        clearInterval(intervalsRef.current[slotIndex]);
        const finalIdx = Math.floor(Math.random() * SLOT_DATA.length);
        setValues((prev) => {
          const next = [...prev];
          next[slotIndex] = SLOT_DATA[finalIdx];
          return next;
        });
        vibrate(30);

        if (slotIndex === STOP_TIMES.length - 1) {
          setTimeout(() => {
            setSpinning(false);
            setValues((prev) => {
              const isWin = prev.every((v) => v === prev[0]);
              setResult(isWin ? 'win' : 'lose');
              if (isWin) vibrate([0, 60, 80, 60]);
              return prev;
            });
          }, 350);
        }
      }, stopAt);
    });
  };

  return (
    <Stack align="center" h={400}>
      <Paper radius={16} withBorder p={4}>
        <Group gap={4}>
          {values.map((value, index) => (
            <Picker
              key={index}
              w={80}
              loop
              withMask
              data={SLOT_DATA}
              value={value}
              readOnly
              itemHeight={50}
              visibleItems={5}
              withHighlight={false}
              maxBlurAmount={spinning ? 8 : 0}
              maskHeight={20}
              size="32px"
              animationDuration={spinning ? 100 : 300}
            />
          ))}
        </Group>
      </Paper>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning…' : 'Spin'}
      </Button>
      <Text fw={700}>
        {result === 'win' ? '🎉 Jackpot! 🎉' : result === 'lose' ? 'Try Again!' : 'Place your bet!'}
      </Text>
    </Stack>
  );
}
`;

export const slotMachine: MantineDemo = {
  type: 'code',
  component: SlotMachine,
  code,
  defaultExpanded: false,
};
