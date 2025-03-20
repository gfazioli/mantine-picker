import { Picker } from '@gfazioli/mantine-picker';
import { Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const data = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];

  return (
    <Stack>
      <Group justify="space-between">
        <Picker w={200} data={data} tt="uppercase" />
        <Picker w={200} data={data} size="xl" />
        <Picker
          w={200}
          data={data}
          variant="gradient"
          gradient={{ from: 'blue', to: 'red', deg: 90 }}
          style={{
            textShadow: '0 4px 2px rgba(0, 0, 0, 0.4)',
          }}
        />
      </Group>
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';
import { Group, Stack } from '@mantine/core';

function Demo() {
  const data = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];

  return (
    <Stack>
      <Group justify="space-between">
        <Picker w={200} data={data} tt="uppercase" />
        <Picker w={200} data={data} size="xl" />
        <Picker
          w={200}
          data={data}
          variant="gradient"
          gradient={{ from: 'blue', to: 'red', deg: 90 }}
          style={{
            textShadow: '0 4px 2px rgba(0, 0, 0, 0.4)',
          }}
        />
      </Group>
    </Stack>
  );
}
`;

export const styles: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
