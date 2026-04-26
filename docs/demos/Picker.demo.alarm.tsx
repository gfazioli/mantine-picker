import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

function Demo() {
  const [hour, setHour] = useState<string | number>('07');
  const [minute, setMinute] = useState<string | number>('30');
  const [period, setPeriod] = useState<string | number>('AM');
  const [armed, setArmed] = useState<string | null>(null);

  const pickerProps = {
    w: 64,
    withDividers: false,
    withHighlight: false,
    itemHeight: 36,
    visibleItems: 5,
    withMask: true,
    maskHeight: 30,
    cylinderRadius: 3,
  };

  const setAlarm = () => {
    setArmed(`${hour}:${minute} ${period}`);
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([0, 30, 50, 30]);
    }
  };

  return (
    <Stack align="center" h={400}>
      <Group gap={4}>
        <Picker {...pickerProps} loop data={HOURS} value={hour} onChange={setHour} hapticFeedback />
        <Text size="lg" fw={700}>
          :
        </Text>
        <Picker
          {...pickerProps}
          loop
          data={MINUTES}
          value={minute}
          onChange={setMinute}
          hapticFeedback
        />
        <Picker
          {...pickerProps}
          data={PERIODS}
          value={period}
          onChange={setPeriod}
          hapticFeedback
        />
      </Group>
      <Button onClick={setAlarm}>Set alarm</Button>
      <Text c={armed ? 'teal' : 'dimmed'} fw={armed ? 700 : 400}>
        {armed ? `⏰ Alarm armed for ${armed}` : 'No alarm set'}
      </Text>
    </Stack>
  );
}

const code = `
import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

function Demo() {
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [period, setPeriod] = useState('AM');
  const [armed, setArmed] = useState(null);

  const pickerProps = {
    w: 64,
    withDividers: false,
    withHighlight: false,
    itemHeight: 36,
    visibleItems: 5,
    withMask: true,
    maskHeight: 30,
    cylinderRadius: 3,
  };

  const setAlarm = () => {
    setArmed(\`\${hour}:\${minute} \${period}\`);
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([0, 30, 50, 30]);
    }
  };

  return (
    <Stack align="center">
      <Group gap={4}>
        <Picker {...pickerProps} loop data={HOURS} value={hour} onChange={setHour} hapticFeedback />
        <Text size="lg" fw={700}>:</Text>
        <Picker {...pickerProps} loop data={MINUTES} value={minute} onChange={setMinute} hapticFeedback />
        <Picker {...pickerProps} data={PERIODS} value={period} onChange={setPeriod} hapticFeedback />
      </Group>
      <Button onClick={setAlarm}>Set alarm</Button>
      <Text>{armed ? \`⏰ Alarm armed for \${armed}\` : 'No alarm set'}</Text>
    </Stack>
  );
}
`;

export const alarm: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
