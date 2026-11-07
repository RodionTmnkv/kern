import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Toast, ToastProvider, ToastTitle, ToastDescription, ToastViewport, ToastClose, ToastAction } from './Toast';

const meta = {
    title: 'Overlays/Toast',
    component: Toast,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
                <ToastViewport />
            </ToastProvider>
        ),
    ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = ({ variant = 'default' }: { variant?: 'default' | 'destructive' | 'success' }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Show Toast</Button>
            <Toast open={open} onOpenChange={setOpen} variant={variant}>
                <div className="grid gap-1">
                    <ToastTitle>Уведомление</ToastTitle>
                    <ToastDescription>Ваши изменения были успешно сохранены.</ToastDescription>
                </div>
                <ToastClose />
            </Toast>
        </>
    );
};

export const Default: Story = {
    render: () => <ToastDemo />,
};

export const Success: Story = {
    render: () => <ToastDemo variant="success" />,
};

export const Destructive: Story = {
    render: () => <ToastDemo variant="destructive" />,
};

export const WithAction: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
                <Toast open={open} onOpenChange={setOpen}>
                    <div className="grid gap-1">
                        <ToastTitle>Файл удален</ToastTitle>
                        <ToastDescription>Вы можете восстановить файл в корзине.</ToastDescription>
                    </div>
                    <ToastAction altText="Отменить удаление">Отменить</ToastAction>
                    <ToastClose />
                </Toast>
            </>
        );
    },
};