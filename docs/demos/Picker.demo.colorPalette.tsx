import { Picker } from '@gfazioli/mantine-picker';
import { Box, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const COLORS = [
  { name: 'Slate', value: '#64748b' },
  { name: 'Crimson', value: '#dc2626' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Rose', value: '#f43f5e' },
];

function Demo() {
  const [name, setName] = useState<string | number>('Sky');
  const selected = COLORS.find((c) => c.name === name) ?? COLORS[0];

  return (
    <Stack align="center" h={400}>
      <Box
        w={180}
        h={80}
        bg={selected.value}
        style={{ borderRadius: 12, transition: 'background-color 200ms' }}
      />
      <Picker
        w={220}
        data={COLORS.map((c) => c.name)}
        value={name}
        onChange={setName}
        renderItem={(item) => {
          const color = COLORS.find((c) => c.name === item);
          return (
            <Group gap="sm" justify="center">
              <Box w={16} h={16} bg={color?.value} style={{ borderRadius: '50%', flexShrink: 0 }} />
              <Text>{item}</Text>
            </Group>
          );
        }}
      />
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';
import { Box, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';

const COLORS = [
  { name: 'Slate', value: '#64748b' },
  { name: 'Crimson', value: '#dc2626' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Rose', value: '#f43f5e' },
];

function Demo() {
  const [name, setName] = useState('Sky');
  const selected = COLORS.find((c) => c.name === name) ?? COLORS[0];

  return (
    <Stack align="center">
      <Box w={180} h={80} bg={selected.value} style={{ borderRadius: 12 }} />
      <Picker
        w={220}
        data={COLORS.map((c) => c.name)}
        value={name}
        onChange={setName}
        renderItem={(item) => {
          const color = COLORS.find((c) => c.name === item);
          return (
            <Group gap="sm" justify="center">
              <Box w={16} h={16} bg={color?.value} style={{ borderRadius: '50%' }} />
              <Text>{item}</Text>
            </Group>
          );
        }}
      />
    </Stack>
  );
}
`;

export const colorPalette: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
