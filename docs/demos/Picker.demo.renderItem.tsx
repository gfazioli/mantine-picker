import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Badge, Code, ColorSwatch, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [value, setValue] = useState<string | number>('');

  const data = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'black',
    'white',
    'gray',
    'violet',
    'pink',
    'brown',
    'cyan',
    'magenta',
    'lime',
    'olive',
    'maroon',
  ];

  function renderItem(item: string | number) {
    return (
      <Group>
        <ColorSwatch size={16} color={item as string} />
        <Text>{item}</Text>
      </Group>
    );
  }

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Group>
        <Picker w={200} onChange={setValue} data={data} renderItem={renderItem} />
        <Picker
          w={200}
          onChange={setValue}
          data={data}
          renderItem={(item) => <Badge color={item as string}>{item}</Badge>}
        />
      </Group>
      <Code>Value: {value}</Code>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Badge, Code, ColorSwatch, Group, Stack, Text } from '@mantine/core';

function Demo(props: PickerProps) {
  const [value, setValue] = useState<string | number>('');

  const data = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'black',
    'white',
    'gray',
    'violet',
    'pink',
    'brown',
    'cyan',
    'magenta',
    'lime',
    'olive',
    'maroon',
  ];

  function renderItem(item: string | number) {
    return (
      <Group>
        <ColorSwatch size={16} color={item as string} />
        <Text>{item}</Text>
      </Group>
    );
  }

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Group>
        <Picker w={200} onChange={setValue} data={data} renderItem={renderItem} />
        <Picker
          w={200}
          onChange={setValue}
          data={data}
          renderItem={(item) => <Badge color={item as string}>{item}</Badge>}
        />
      </Group>
      <Code>Value: {value}</Code>
    </Stack>
  );
}
`;

export const renderItem: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
