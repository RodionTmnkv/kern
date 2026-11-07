import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
    title: 'Forms/Input',
    component: Input,
    tags: ['autodocs'],
    args: {
        placeholder: 'Введите текст...',
        disabled: false,
    },
    argTypes: {
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Email',
        placeholder: 'name@example.com',
    },
};

export const WithHint: Story = {
    args: {
        label: 'Пароль',
        type: 'password',
        hint: 'Минимум 8 символов, включая цифры',
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        value: 'invalid-email',
        error: 'Пожалуйста, введите корректный email',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Имя пользователя',
        value: 'admin',
        disabled: true,
    },
};