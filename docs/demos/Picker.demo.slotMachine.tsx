import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function SlotMachine() {
  const slotMachineData = [
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

  const pickerNumber = 3;
  const [values, setValues] = useState(Array(pickerNumber).fill(slotMachineData[0]));
  const [spinning, setSpinning] = useState(false);

  const pickerSize = 80;
  const groupGap = 4;
  const paperPadding = 4;
  const paperWidth = pickerSize * pickerNumber + paperPadding * 2 + groupGap * pickerNumber;

  const spin = () => {
    setSpinning(true);
    const newValues = Array.from(
      { length: pickerNumber },
      () => slotMachineData[Math.floor(Math.random() * slotMachineData.length)]
    );

    setValues(newValues);
    setSpinning(false);
  };

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Paper radius={16} withBorder w={paperWidth} p={paperPadding}>
        <Group gap={groupGap}>
          {Array.from({ length: pickerNumber }).map((_, index) => (
            <Picker
              key={index}
              w={pickerSize}
              loop
              withMask
              data={slotMachineData}
              value={values[index]}
              readOnly
              itemHeight={50}
              visibleItems={5}
              withHighlight={false}
              maxBlurAmount={8}
              maskHeight={20}
              size="32px"
            />
          ))}
        </Group>
      </Paper>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </Button>
      <Text>{values.every((val, _, arr) => val === arr[0]) ? '🎉 Jackpot! 🎉' : 'Try Again!'}</Text>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function SlotMachine() {
  const slotMachineData = [
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

  const pickerNumber = 3;
  const [values, setValues] = useState(Array(pickerNumber).fill(slotMachineData[0]));
  const [spinning, setSpinning] = useState(false);

  const pickerSize = 80;
  const groupGap = 4;
  const paperPadding = 4;
  const paperWidth = pickerSize * pickerNumber + paperPadding * 2 + groupGap * pickerNumber;

  const spin = () => {
    setSpinning(true);
    const newValues = Array.from(
      { length: pickerNumber },
      () => slotMachineData[Math.floor(Math.random() * slotMachineData.length)]
    );

    setValues(newValues);
    setSpinning(false);
  };

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Paper radius={16} withBorder w={paperWidth} p={paperPadding}>
        <Group gap={groupGap}>
          {Array.from({ length: pickerNumber }).map((_, index) => (
            <Picker
              key={index}
              w={pickerSize}
              loop
              withMask
              data={slotMachineData}
              value={values[index]}
              readOnly
              itemHeight={50}
              visibleItems={5}
              withHighlight={false}
              maxBlurAmount={8}
              maskHeight={20}
              size="32px"
            />
          ))}
        </Group>
      </Paper>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </Button>
      <Text>{values.every((val, _, arr) => val === arr[0]) ? '🎉 Jackpot! 🎉' : 'Try Again!'}</Text>
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
