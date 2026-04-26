import { Picker } from '@gfazioli/mantine-picker';
import { Badge, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

function Demo() {
  const [scrolling, setScrolling] = useState(false);
  const [eventCount, setEventCount] = useState({ start: 0, end: 0 });

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

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Group gap="xs">
        <Text size="sm">Status:</Text>
        <Badge color={scrolling ? 'orange' : 'gray'}>{scrolling ? 'scrolling' : 'idle'}</Badge>
        <Text size="sm" c="dimmed">
          start: {eventCount.start} · end: {eventCount.end}
        </Text>
      </Group>
      <Picker
        data={months}
        defaultValue="June"
        onScrollStart={() => {
          setScrolling(true);
          setEventCount((c) => ({ ...c, start: c.start + 1 }));
        }}
        onScrollEnd={() => {
          setScrolling(false);
          setEventCount((c) => ({ ...c, end: c.end + 1 }));
        }}
      />
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';
import { Badge, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [scrolling, setScrolling] = useState(false);
  const [eventCount, setEventCount] = useState({ start: 0, end: 0 });

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Group gap="xs">
        <Text size="sm">Status:</Text>
        <Badge color={scrolling ? 'orange' : 'gray'}>{scrolling ? 'scrolling' : 'idle'}</Badge>
        <Text size="sm" c="dimmed">
          start: {eventCount.start} · end: {eventCount.end}
        </Text>
      </Group>
      <Picker
        data={months}
        defaultValue="June"
        onScrollStart={() => {
          setScrolling(true);
          setEventCount((c) => ({ ...c, start: c.start + 1 }));
        }}
        onScrollEnd={() => {
          setScrolling(false);
          setEventCount((c) => ({ ...c, end: c.end + 1 }));
        }}
      />
    </Stack>
  );
}
`;

export const scrollEvents: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
