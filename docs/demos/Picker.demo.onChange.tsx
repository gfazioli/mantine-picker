import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Code, Select, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [value, setValue] = useState<string | null>(
    new Date().toLocaleString('en-US', { month: 'long' })
  );
  const data = [
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
      <Picker onChange={setValue} value={value} data={data} />
      <Code>Value: {value}</Code>
      <Select data={data} label="Select value" placeholder="Select value" onChange={setValue} />
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Code, Select, Stack } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>(
    new Date().toLocaleString('en-US', { month: 'long' })
  );
  const data = [
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
      <Picker onChange={setValue} value={value} data={data} />
      <Code>Value: {value}</Code>
      <Select data={data} label="Select value" placeholder="Select value" onChange={setValue} />
    </Stack>
  );
}
`;

export const onChange: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
