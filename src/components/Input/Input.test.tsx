import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Input } from './Input';

describe('Input', () => {
    it('links label to input and forwards typing', async () => {
        render(<Input label="Email" />);

        const input = screen.getByLabelText('Email');
        await userEvent.type(input, 'test@test.com');

        expect(input).toHaveValue('test@test.com');
    });

    it('sets aria-invalid and links error message', () => {
        render(<Input label="Name" error="Name is required" />);

        const input = screen.getByLabelText('Name');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('-error'));
        expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
        const { container } = render(<Input label="Accessible" hint="Some hint" />);
        expect(await axe(container)).toHaveNoViolations();
    });
});