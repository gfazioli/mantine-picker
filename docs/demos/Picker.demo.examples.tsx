import { useState } from 'react';
import { Picker, PickerProps } from '@gfazioli/mantine-picker';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const length = 10;
  const data = Array.from({ length }, (_, i) => i);

  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => {
    setSeconds((s) => (s === length - 1 ? 0 : s + 1));
  }, 1000);

  const pickerProps: PickerProps = {
    w: 60,
    withDividers: false,
    withHighlight: false,
    withMask: false,
    itemHeight: 24,
    readOnly: true,
    data,
  };

  return (
    <Stack align="center" justify="space-between" h={200}>
      <Group>
        <Picker
          {...pickerProps}
          maxBlurAmount={1.5}
          minItemOpacity={0.5}
          visibleItems={3}
          value={seconds}
        />
        <Picker
          {...pickerProps}
          loop={false}
          c="red"
          minItemScale={0.1}
          visibleItems={1}
          animationDuration={700}
          value={seconds}
        />
      </Group>

      <Button onClick={interval.toggle}>{interval.active ? 'Stop' : 'Start'}</Button>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Button, Group, Stack } from '@mantine/core';
import { useInterval } from '@mantine/hooks';

function Demo() {
  const length = 10;
  const data = Array.from({ length }, (_, i) => i);

  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => {
    setSeconds((s) => (s === length - 1 ? 0 : s + 1));
  }, 1000);

  const pickerProps: PickerProps = {
    w: 60,
    withDividers: false,
    withHighlight: false,
    withMask: false,
    itemHeight: 24,
    readOnly: true,
    data,
  };

  return (
    <Stack align="center" justify="space-between" h={200}>
      <Group>
        <Picker
          {...pickerProps}
          maxBlurAmount={1.5}
          minItemOpacity={0.5}
          visibleItems={3}
          value={seconds}
        />
        <Picker
          {...pickerProps}
          loop={false}
          c="red"
          minItemScale={0.1}
          visibleItems={1}
          animationDuration={700}
          value={seconds}
        />
      </Group>

      <Button onClick={interval.toggle}>{interval.active ? 'Stop' : 'Start'}</Button>
    </Stack>
  );
}
`;

export const counter: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};

function TimePicker() {
  const initialHour12 = +(new Date().getHours() as number) % 12;

  const [hours24, setHours24] = useState(new Date().getHours().toString());
  const [hours12, setHours12] = useState(
    initialHour12 < 10 ? `0${initialHour12}` : `${initialHour12}`
  );
  const [minutes24, setMinutes24] = useState(new Date().getMinutes());
  const [minutes12, setMinutes12] = useState(new Date().getMinutes());
  const [amPm, setAmPm] = useState(new Date().getHours() >= 12 ? 'pm' : 'am');

  const hours24Data = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  const hours12Data = Array.from({ length: 12 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  const minutesData = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i));

  const pickerProps: Omit<PickerProps, 'data'> = {
    w: 50,
    withDividers: false,
    withHighlight: false,
    loop: true,
    maxRotation: 90,
    itemHeight: 32,
    visibleItems: 5,
    withMask: false,
    cylinderRadius: 3,
  };

  return (
    <Group justify="center" grow>
      <Stack align="center" justify="space-between" h={200}>
        <Group gap={0}>
          <Text>🕑</Text>
          <Picker
            {...pickerProps}
            rotateY={-10}
            data={hours24Data}
            value={hours24}
            onChange={setHours24}
          />
          <Text>:</Text>
          <Picker
            {...pickerProps}
            rotateY={10}
            data={minutesData}
            value={minutes24}
            onChange={setMinutes24}
          />
          <Text>min</Text>
        </Group>
        <Text>Selected time: {`${hours24}:${minutes24}`}</Text>
      </Stack>

      <Stack align="center" justify="space-between" h={200}>
        <Group gap={0}>
          <Picker
            {...pickerProps}
            rotateY={-10}
            data={hours12Data}
            value={hours12}
            onChange={setHours12}
          />
          <Text>:</Text>
          <Picker
            {...pickerProps}
            rotateY={10}
            data={minutesData}
            value={minutes12}
            onChange={setMinutes12}
          />
          <Picker
            {...pickerProps}
            rotateY={10}
            data={['am', 'pm']}
            loop={false}
            value={amPm}
            onChange={setAmPm}
          />
        </Group>
        <Text>Selected time: {`${hours12}:${minutes12} ${amPm}`}</Text>
      </Stack>
    </Group>
  );
}

const timePickerCode = `
import { useState } from 'react';
import { Picker } from '@gfazioli/mantine-picker';
import { Group, Stack, Text } from '@mantine/core';

function Demo() {
  const initialHour12 = +(new Date().getHours() as number) % 12;

  const [hours24, setHours24] = useState(new Date().getHours().toString());
  const [hours12, setHours12] = useState(
    initialHour12 < 10 ? \`0$\{initialHour12}\` : \`$\{initialHour12}\`
  );
  const [minutes24, setMinutes24] = useState(new Date().getMinutes());
  const [minutes12, setMinutes12] = useState(new Date().getMinutes());
  const [amPm, setAmPm] = useState(new Date().getHours() >= 12 ? 'pm' : 'am');

  const hours24Data = Array.from({ length: 24 }, (_, i) => (i < 10 ? \`0$\{i}\` : \`$\{i}\`));
  const hours12Data = Array.from({ length: 12 }, (_, i) => (i < 10 ? \`0$\{i}\` : \`$\{i}\`));
  const minutesData = Array.from({ length: 60 }, (_, i) => (i < 10 ? \`0$\{i}\` : i));

  const pickerProps: Omit<PickerProps, 'data'> = {
    w: 50,
    withDividers: false,
    withHighlight: false,
    loop: true,
    maxRotation: 90,
    itemHeight: 30,
    visibleItems: 5,
    withMask: false,
  };

  return (
    <Group justify="center" grow>
      <Stack align="center" justify="space-between" h={200}>
        <Group gap={0}>
          <Text>🕑</Text>
          <Picker
            {...pickerProps}
            rotateY={-10}
            data={hours24Data}
            value={hours24}
            onChange={setHours24}
          />
          <Text>:</Text>
          <Picker
            {...pickerProps}
            rotateY={10}
            data={minutesData}
            value={minutes24}
            onChange={setMinutes24}
          />
          <Text>min</Text>
        </Group>
        <Text>Selected time: {\`$\{hours24}:$\{minutes24}\`}</Text>
      </Stack>

      <Stack align="center" justify="space-between" h={200}>
        <Group gap={0}>
          <Picker
            {...pickerProps}
            rotateY={-10}
            data={hours12Data}
            value={hours12}
            onChange={setHours12}
          />
          <Text>:</Text>
          <Picker
            {...pickerProps}
            rotateY={10}
            data={minutesData}
            value={minutes12}
            onChange={setMinutes12}
          />
          <Picker
            {...pickerProps}
            rotateY={10}
            data={['am', 'pm']}
            loop={false}
            value={amPm}
            onChange={setAmPm}
          />
        </Group>
        <Text>Selected time: {\`$\{hours12}:$\{minutes12} $\{amPm}\`}</Text>
      </Stack>
    </Group>
  );
}
`;

export const timePicker: MantineDemo = {
  type: 'code',
  component: TimePicker,
  code: timePickerCode,
  defaultExpanded: false,
};

function DatePicker() {
  const days = Array.from({ length: 31 }, (_, i) => (i < 9 ? `0${i + 1}` : `${i + 1}`));
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
  // years start from 1970 to 2030
  const years = Array.from({ length: 61 }, (_, i) => (i + 1970).toString());

  const today =
    (new Date().getDate() as number) < 10 ? `0${new Date().getDate()}` : new Date().getDate();

  const [day, setDay] = useState(today.toString());
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const pickerProps: Omit<PickerProps, 'data'> = {
    withDividers: false,
    withHighlight: false,
    loop: true,
    maxRotation: 90,
    itemHeight: 30,
    visibleItems: 5,
    withMask: false,
    cylinderRadius: 3,
  };

  return (
    <Stack align="center" justify="space-between" h={200}>
      <Group gap={0}>
        <Picker {...pickerProps} w={60} value={day} data={days} rotateY={-10} onChange={setDay} />
        <Picker {...pickerProps} w={80} value={month} data={months} onChange={setMonth} />
        <Picker {...pickerProps} w={60} value={year} data={years} rotateY={10} onChange={setYear} />
      </Group>
      <Text>Selected date: {`${day} ${month} ${year}`}</Text>
    </Stack>
  );
}

const datePickerCode = `
import { useState } from 'react';
import { Picker, PickerProps } from '@gfazioli/mantine-picker';
import { Group, Stack, Text } from '@mantine/core';

function DatePicker() {
  const days = Array.from({ length: 31 }, (_, i) => (i < 9 ? \`0$\{i + 1}\` : \`$\{i + 1}\`));
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
  // years start from 1970 to 2030
  const years = Array.from({ length: 61 }, (_, i) => (i + 1970).toString());

  const today =
    (new Date().getDate() as number) < 10 ? \`0$\{new Date().getDate()}\` : new Date().getDate();

  const [day, setDay] = useState(today.toString());
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const pickerProps: Omit<PickerProps, 'data'> = {
    withDividers: false,
    withHighlight: false,
    loop: true,
    maxRotation: 90,
    itemHeight: 30,
    visibleItems: 5,
    withMask: false,
    cylinderRadius: 3,
  };

  return (
    <Stack align="center" justify="space-between" h={200}>
      <Group gap={0}>
        <Picker {...pickerProps} w={60} value={day} data={days} rotateY={-10} onChange={setDay} />
        <Picker {...pickerProps} w={80} value={month} data={months} onChange={setMonth} />
        <Picker {...pickerProps} w={60} value={year} data={years} rotateY={10} onChange={setYear} />
      </Group>
      <Text>Selected date: {\`$\{day} $\{month} $\{year}\`}</Text>
    </Stack>
  );
}
 `;

export const datePicker: MantineDemo = {
  type: 'code',
  component: DatePicker,
  code: datePickerCode,
  defaultExpanded: false,
};
