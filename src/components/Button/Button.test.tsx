import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';

describe('Button', () => {
    it('renders children and forwards click', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Save</Button>);

        await userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders as a link when asChild is used', () => {
        render(
            <Button asChild>
                <a href="/docs">Documentation</a>
            </Button>,
        );

        const link = screen.getByRole('link', { name: 'Documentation' });
        expect(link).toHaveAttribute('href', '/docs');
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
        const { container } = render(<Button>Accessible</Button>);
        expect(await axe(container)).toHaveNoViolations();
    });
});