import { Picker } from '@gfazioli/mantine-picker';
import { Group, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

function Demo() {
  return (
    <Group justify="center" gap={40}>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          Default (no mask)
        </Text>
        <Picker data={data} w={120} visibleItems={5} />
      </div>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          With mask
        </Text>
        <Picker data={data} w={120} visibleItems={5} withMask maskHeight={45} maskIntensity={40} />
      </div>
      <div>
        <Text size="xs" c="dimmed" ta="center" mb="xs">
          Intense mask
        </Text>
        <Picker data={data} w={120} visibleItems={5} withMask maskHeight={60} maskIntensity={70} />
      </div>
    </Group>
  );
}

const code = `import { Picker } from '@gfazioli/mantine-picker';
import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center" gap={40}>
      {/* No mask (default) */}
      <Picker data={data} w={120} visibleItems={5} />

      {/* With gradient mask */}
      <Picker data={data} w={120} visibleItems={5} withMask maskHeight={45} maskIntensity={40} />

      {/* Intense mask */}
      <Picker data={data} w={120} visibleItems={5} withMask maskHeight={60} maskIntensity={70} />
    </Group>
  );
}
`;

export const mask: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
