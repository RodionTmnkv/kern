import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
    title: 'Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Airplane mode',
    },
};

export const Checked: Story = {
    args: {
        label: 'Dark mode',
        defaultChecked: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Push notifications',
        description: 'Receive updates when someone replies to your thread.',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        disabled: true,
    },
};