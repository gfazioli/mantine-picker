import React, { useEffect, useState } from 'react';
import { Badge, Button, Group, Paper, SegmentedControl, Select, Stack, Text } from '@mantine/core';
import { Picker, PickerProps } from './Picker';

export default {
  title: 'Picker',
  args: {
    animate: true,
    animationDuration: 300,
    rotateY: 0,
    disabled: false,
    readOnly: false,
    loop: false,
    preventPageScroll: true,
    withHighlight: true,
    withDividers: true,
    withMask: false,
    enable3D: true,
    perspective: 100,
    maxRotation: 60,
    easingFunction: 'linear',
    itemHeight: 40,
    visibleItems: 3,
    size: 'md',
    minItemOpacity: 1,
    minItemScale: 1,
    maxBlurAmount: 0,
    wheelSensitivity: 1,
    maskHeight: 55,
    maskIntensity: 10,
    cylinderRadius: 4,
    momentum: 0.95,
    decelerationRate: 0.95,
  },
  argTypes: {
    animate: { control: 'boolean' },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    animationDuration: { control: { type: 'range', min: 0.1, max: 5000, step: 0.1 } },
    rotateY: { control: { type: 'range', min: -20, max: 20, step: 1 } },
    easingFunction: {
      control: {
        type: 'select',
      },
      options: [
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out',
        'linear',
        'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'cubic-bezier(0.25, 0.1, 0.25, 1)',
      ],
    },
    loop: { control: 'boolean' },
    itemHeight: { control: { type: 'range', min: 8, max: 64, step: 1 } },
    visibleItems: { control: { type: 'range', min: 1, max: 30, step: 2 } },
    preventPageScroll: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    minItemOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    minItemScale: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    maxBlurAmount: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    wheelSensitivity: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    withHighlight: { control: 'boolean' },
    withDividers: { control: 'boolean' },
    withMask: { control: 'boolean' },
    enable3D: { control: 'boolean' },
    maskHeight: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    maskIntensity: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    perspective: { control: { type: 'range', min: 0, max: 2000, step: 1 } },
    maxRotation: { control: { type: 'range', min: 0, max: 90, step: 1 } },
    cylinderRadius: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    momentum: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    decelerationRate: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
  },
};

type PickerDataType = 'tens' | 'hundreds' | 'months' | 'cities' | 'colors' | 'fonts' | 'sizes';

function useData(initialType: PickerDataType) {
  const [type, setType] = useState<PickerDataType | string>(initialType);

  const [data, setData] = useState<any[]>([]);

  function SelectData() {
    return (
      <SegmentedControl
        value={type}
        onChange={setType}
        data={[
          { label: 'Tens', value: 'tens' },
          { label: 'Hundreds', value: 'hundreds' },
          { label: 'Months', value: 'months' },
          { label: 'Cities', value: 'cities' },
          { label: 'Colors', value: 'colors' },
          { label: 'Fonts', value: 'fonts' },
          { label: 'Sizes', value: 'sizes' },
        ]}
      />
    );
  }

  const availableTypes = {
    tens: Array.from({ length: 10 }, (_, i) => i),
    hundreds: Array.from({ length: 100 }, (_, i) => i),
    months: [
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
    ],
    cities: [
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
    ],
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal'],
    fonts: [
      'Arial',
      'Verdana',
      'Helvetica',
      'Times New Roman',
      'Courier New',
      'Georgia',
      'Trebuchet MS',
      'Impact',
      'Comic Sans MS',
      'Lucida Console',
    ],
    sizes: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px'],
  };

  React.useEffect(() => {
    setData(availableTypes[type]);
  }, [type]);

  return [data, SelectData] as const;
}

export function Usage(props: PickerProps) {
  const [data, SelectData] = useData('tens');

  return (
    <Stack>
      <SelectData />
      <Picker {...props} data={data} />
    </Stack>
  );
}

export function OnChange(props: PickerProps) {
  const [value, setValue] = useState<any>(0);
  const [data, SelectData] = useData('tens');

  return (
    <Stack>
      <SelectData />
      <Picker {...props} data={data} onChange={setValue} />
      <Text>Selected value: {value}</Text>
    </Stack>
  );
}

export function Props(props: PickerProps) {
  const [data, SelectData] = useData('tens');

  return (
    <Stack>
      <SelectData />
      <Picker
        {...props}
        data={data}
        tt="capitalize"
        size="49px"
        fz={32}
        fs="italic"
        fw={900}
        td="underline"
        ta="center"
        variant="gradient"
        gradient={{ from: 'blue', to: 'red', deg: 90 }}
      />
    </Stack>
  );
}

export function WithPaper(props: PickerProps) {
  return (
    <Paper w={100} h={104} withBorder radius={32}>
      <Picker
        h={100}
        {...props}
        style={{
          borderRadius: '32px',
        }}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    </Paper>
  );
}

export function LeftSection(props: PickerProps) {
  const [value, setValue] = useState<any>(0);

  return (
    <Stack>
      <Group>
        <Picker
          w={200}
          {...props}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          onChange={setValue}
          leftSection="🤔🤔"
        />
        <Picker w={200} {...props} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onChange={setValue} />
        <Picker w={100} {...props} data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} leftSection="🤔" />
        <Picker
          w={300}
          {...props}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          onChange={setValue}
          rightSection="🤔"
        />
      </Group>
      <Text>Selected value: {value}</Text>
    </Stack>
  );
}

export function Time(props: PickerProps) {
  // set the current date
  const [hours, setHours] = useState(new Date().getHours().toString());
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  const hoursData = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  const minutesData = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i));

  const pickerProps = {
    w: 50,
    withDividers: false,
    withHighlight: false,
    loop: true,
    maxRotation: 90,
    itemHeight: 30,
  };

  return (
    <Stack>
      <Group gap={0}>
        <Text>🕑</Text>
        <Picker
          {...props}
          {...pickerProps}
          rotateY={-5}
          data={hoursData}
          value={hours}
          onChange={setHours}
        />
        <Text>:</Text>
        <Picker
          {...props}
          {...pickerProps}
          rotateY={5}
          data={minutesData}
          value={minutes}
          onChange={setMinutes}
        />
        <Text>min</Text>
      </Group>
      <Text>Selected value: {`${hours}:${minutes}`}</Text>
    </Stack>
  );
}

export function SetValue(props: PickerProps) {
  const [value, setValue] = useState<any>();
  const [data, SelectData] = useData('hundreds');

  useEffect(() => {
    setValue(null);
  }, [data]);

  return (
    <Stack>
      <SelectData />
      <Picker {...props} data={data} onChange={setValue} value={+value} />
      <Text>Selected value: {value}</Text>
      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>
        Set Random value from 0 to 99
      </Button>
      <Select
        data={data.map((item) => item.toString())}
        value={`${value}`}
        onChange={(val) => setValue(val)}
        label="Select a value"
      />
    </Stack>
  );
}

export function RenderItem(props: PickerProps) {
  const [value, setValue] = useState<any>(0);
  const [data] = useData('colors');

  return (
    <Stack>
      <Picker
        {...props}
        data={data}
        onChange={setValue}
        renderItem={(item) => <Badge color={item}>{item}</Badge>}
      />
      <Text>Selected value: {value}</Text>
    </Stack>
  );
}

export function RenderItemShadow(props: PickerProps) {
  const [value, setValue] = useState<any>(0);
  const [data] = useData('colors');

  return (
    <Stack>
      <Picker
        {...props}
        data={data}
        onChange={setValue}
        renderItem={(item) => (
          <>
            <Badge color={item}>{item}</Badge>
            <Badge
              color="black"
              style={{
                position: 'absolute',
                zIndex: -1,
                filter: 'blur(5px)',
                marginBottom: -10,
                transform: 'translateZ(2px)',
              }}
            >
              {item}
            </Badge>
          </>
        )}
      />
      <Text>Selected value: {value}</Text>
    </Stack>
  );
}

/**
 * Funny Game to replicate a SlotMachine by using the Picker component
 *
 */
export function SlotMachine(props: PickerProps) {
  const slotMachineData = [
    '🍒',
    '🍋',
    '🍊',
    '🍉',
    '🍇',
    '🍓',
    '🍈',
    '🍌',
    '🍍',
    '🥝',
    '🍏',
    '🍎',
    '🍐',
    '🍑',
  ];

  const pickerNumber = 3;
  const [values, setValues] = useState(Array(pickerNumber).fill(slotMachineData[0]));
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    const newValues = Array.from(
      { length: pickerNumber },
      () => slotMachineData[Math.floor(Math.random() * slotMachineData.length)]
    );

    setValues(newValues);
    setSpinning(false);
  };

  return (
    <Stack>
      <Paper withBorder w={300}>
        <Group>
          {Array.from({ length: pickerNumber }).map((_, index) => (
            <Picker
              key={index}
              {...props}
              w={80}
              loop
              withMask
              data={slotMachineData}
              value={values[index]}
              readOnly
              itemHeight={50}
              visibleItems={5}
              withHighlight={false}
              maxBlurAmount={8}
              size="32px"
            />
          ))}
        </Group>
      </Paper>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </Button>
      <Text>{values.every((val, _, arr) => val === arr[0]) ? '🎉 Jackpot! 🎉' : 'Try Again!'}</Text>
    </Stack>
  );
}
