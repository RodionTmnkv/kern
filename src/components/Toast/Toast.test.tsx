import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastProvider, ToastTitle, ToastViewport, ToastClose } from './Toast';

// Полифилл для Radix UI: jsdom не поддерживает Pointer Events API
if (typeof window !== 'undefined') {
    if (!window.Element.prototype.hasPointerCapture) {
        window.Element.prototype.hasPointerCapture = vi.fn();
    }
    if (!window.Element.prototype.releasePointerCapture) {
        window.Element.prototype.releasePointerCapture = vi.fn();
    }
    if (!window.Element.prototype.setPointerCapture) {
        window.Element.prototype.setPointerCapture = vi.fn();
    }
}

describe('Toast', () => {
    it('renders and can be closed', async () => {
        // Мы будем следить за вызовом коллбэка, а не за удалением из DOM
        const onOpenChange = vi.fn();

        render(
            <ToastProvider>
                <Toast open onOpenChange={onOpenChange}>
                    <ToastTitle>Saved successfully</ToastTitle>
                    <ToastClose />
                </Toast>
                <ToastViewport />
            </ToastProvider>
        );

        expect(screen.getByText('Saved successfully')).toBeInTheDocument();

        // Кликаем по кнопке закрытия
        await userEvent.click(screen.getByRole('button', { name: /закрыть/i }));

        // Проверяем, что Radix понял, что тост нужно закрыть
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
});