import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Switch } from './Switch';

describe('Switch', () => {
    it('toggles state on click', async () => {
        const onCheckedChange = vi.fn();
        render(<Switch label="Airplane mode" onCheckedChange={onCheckedChange} />);

        const toggle = screen.getByRole('switch', { name: 'Airplane mode' });
        expect(toggle).toHaveAttribute('aria-checked', 'false');

        await userEvent.click(toggle);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('toggles state on keyboard space', async () => {
        render(<Switch label="Airplane mode" />);
        const toggle = screen.getByRole('switch');

        await userEvent.tab(); // фокус на переключатель
        expect(toggle).toHaveFocus();

        await userEvent.keyboard(' ');
        expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('has no accessibility violations', async () => {
        const { container } = render(
            <Switch label="Accessible switch" description="This is a description" />
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});