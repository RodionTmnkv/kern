import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './Dialog';

describe('Dialog', () => {
    it('opens on trigger click and closes on Escape', async () => {
        render(
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Title</DialogTitle>
                        <DialogDescription>Description</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );

        // Изначально контента нет
        expect(screen.queryByText('Title')).not.toBeInTheDocument();

        // Открываем
        await userEvent.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByText('Title')).toBeInTheDocument();

        // Закрываем по Escape
        await userEvent.keyboard('{Escape}');
        expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
        const { baseElement } = render(
            <Dialog defaultOpen>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Accessible Dialog</DialogTitle>
                        <DialogDescription>Accessible description</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );

        // baseElement нужен, потому что Dialog рендерится в портал
        expect(await axe(baseElement)).toHaveNoViolations();
    });
});