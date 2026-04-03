import { Picker } from '@gfazioli/mantine-picker';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Demo() {
  return (
    <Group justify="center" gap={40}>
      <Picker data={months} w={120} rotateY={-15} perspective={200} cylinderRadius={3} />
      <Picker data={months} w={120} />
      <Picker data={months} w={120} rotateY={15} perspective={200} cylinderRadius={3} />
    </Group>
  );
}

const code = `import { Picker } from '@gfazioli/mantine-picker';
import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center" gap={40}>
      <Picker data={months} w={120} rotateY={-15} perspective={200} cylinderRadius={3} />
      <Picker data={months} w={120} />
      <Picker data={months} w={120} rotateY={15} perspective={200} cylinderRadius={3} />
    </Group>
  );
}
`;

export const effect3d: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
