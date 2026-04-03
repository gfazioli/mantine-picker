import { Picker } from '@gfazioli/mantine-picker';
import { Group, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = ['React', 'Angular', 'Vue', 'Svelte', 'Solid', 'Preact', 'Lit', 'Qwik'];

function Demo() {
  return (
    <Group justify="center" gap={40}>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          Blur
        </Text>
        <Picker data={data} w={100} maxBlurAmount={4} />
      </div>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          Opacity
        </Text>
        <Picker data={data} w={100} minItemOpacity={0.1} />
      </div>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          Scale
        </Text>
        <Picker data={data} w={100} minItemScale={0.5} />
      </div>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          Combined
        </Text>
        <Picker data={data} w={100} maxBlurAmount={3} minItemOpacity={0.2} minItemScale={0.6} />
      </div>
    </Group>
  );
}

const code = `import { Picker } from '@gfazioli/mantine-picker';
import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center" gap={40}>
      {/* Blur effect on non-selected items */}
      <Picker data={data} w={100} maxBlurAmount={4} />

      {/* Opacity gradient */}
      <Picker data={data} w={100} minItemOpacity={0.1} />

      {/* Scale gradient */}
      <Picker data={data} w={100} minItemScale={0.5} />

      {/* All combined */}
      <Picker data={data} w={100} maxBlurAmount={3} minItemOpacity={0.2} minItemScale={0.6} />
    </Group>
  );
}
`;

export const visualEffects: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
