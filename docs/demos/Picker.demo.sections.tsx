import { Picker } from '@gfazioli/mantine-picker';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Stack>
      <Group justify="space-between">
        <Picker w={200} data={data} leftSection="👉" />
        <Picker w={200} data={data} rightSection="👈" />
        <Picker w={200} data={data} leftSection="↑" rightSection="↓" />
      </Group>
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';
import { Group, Stack } from '@mantine/core';

function Demo(props: PickerProps) {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Stack>
      <Group justify="space-between">
        <Picker w={200} data={data} leftSection="👉" />
        <Picker w={200} data={data} rightSection="👈" />
        <Picker w={200} data={data} leftSection="↑" rightSection="↓" />
      </Group>
    </Stack>
  );
}
`;

export const sections: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};

function DemoGroup() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Stack>
      <Group justify="space-between">
        <Group>
          <Text>👉</Text>
          <Picker w={200} data={data} />
          <Text>👈</Text>
        </Group>
        <Group>
          <Picker w={100} data={data} />
          <Text>:</Text>
          <Picker w={100} data={data} />
        </Group>
      </Group>
    </Stack>
  );
}

const codGroup = `
import { Picker } from '@gfazioli/mantine-picker';
import { Group, Stack, Text } from '@mantine/core';

function Demo(props: PickerProps) {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Stack>
      <Group justify="space-between">
        <Group>
          <Text>👉</Text>
          <Picker w={200} data={data} />
          <Text>👈</Text>
        </Group>
        <Group>
          <Picker w={100} data={data} />
          <Text>:</Text>
          <Picker w={100} data={data} />
        </Group>
      </Group>
    </Stack>
  );
}
`;

export const group: MantineDemo = {
  type: 'code',
  component: DemoGroup,
  code: codGroup,
  defaultExpanded: false,
};
