import { Picker } from '@gfazioli/mantine-picker';
import { Slider, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

function Demo() {
  const [duration, setDuration] = useState<number>(15);

  return (
    <Stack align="center" justify="space-between" h={400}>
      <Stack gap={4}>
        <Text size="sm" c="dimmed">
          Open this demo on a phone or tablet to feel the haptic pulse on every selection change.
          Desktop browsers silently ignore <code>navigator.vibrate</code>.
        </Text>
        <Text size="xs" c="dimmed">
          Pulse duration: {duration}ms
        </Text>
        <Slider min={5} max={80} step={5} value={duration} onChange={setDuration} />
      </Stack>
      <Picker
        data={['January', 'February', 'March', 'April', 'May', 'June']}
        defaultValue="March"
        hapticFeedback={duration}
      />
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';

function Demo() {
  return (
    <Picker
      data={['January', 'February', 'March', 'April', 'May', 'June']}
      defaultValue="March"
      hapticFeedback   // boolean (default 15ms) or number for custom duration
    />
  );
}
`;

export const haptic: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
