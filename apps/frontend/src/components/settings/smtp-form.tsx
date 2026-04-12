import { useForm } from '@tanstack/react-form';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormError, PasswordField, TextField } from '@/components/ui/form-fields';
import { Switch } from '@/components/ui/switch';

export interface SmtpFormProps {
	hasExistingCredentials: boolean;
	initialValues: { host: string; port: string; mailFrom: string; ssl: boolean };
	onSubmit: (values: {
		host: string;
		port: string;
		mailFrom: string;
		password: string;
		ssl: boolean;
	}) => Promise<void>;
	onCancel: () => void;
	isPending: boolean;
	error: { message: string } | null;
}

export function SmtpForm({
	hasExistingCredentials,
	initialValues,
	onSubmit,
	onCancel,
	isPending,
	error,
}: SmtpFormProps) {
	const form = useForm({
		defaultValues: {
			host: '',
			port: '',
			mailFrom: '',
			password: '',
			ssl: initialValues.ssl,
		},
		onSubmit: async ({ value }) => {
			await onSubmit(value);
		},
	});

	const keepCurrentHint = hasExistingCredentials ? '(leave empty to keep current)' : undefined;
	const passwordHint = keepCurrentHint;

	return (
		<div className='flex flex-col gap-3 p-4 rounded-lg border border-primary/50 bg-muted/30'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className='flex flex-col gap-3'
			>
				<div className='flex items-center justify-between'>
					<span className='text-sm font-medium text-foreground'>SMTP</span>
					<Button variant='ghost' size='icon-sm' type='button' onClick={onCancel}>
						<X className='size-4' />
					</Button>
				</div>

				<TextField
					form={form}
					name='host'
					label='SMTP Host'
					placeholder={hasExistingCredentials ? initialValues.host || 'smtp.example.com' : 'smtp.example.com'}
					hint={keepCurrentHint}
					required={!hasExistingCredentials}
				/>
				<TextField
					form={form}
					name='port'
					label='SMTP Port'
					placeholder={hasExistingCredentials ? initialValues.port || '587' : '587'}
					hint={keepCurrentHint}
					required={!hasExistingCredentials}
				/>
				<TextField
					form={form}
					name='mailFrom'
					label='Mail From'
					placeholder={
						hasExistingCredentials ? initialValues.mailFrom || 'noreply@example.com' : 'noreply@example.com'
					}
					hint={keepCurrentHint}
					required={!hasExistingCredentials}
				/>
				<PasswordField
					form={form}
					name='password'
					label='SMTP Password'
					placeholder={hasExistingCredentials ? 'Enter new password to update' : 'Enter your SMTP password'}
					hint={passwordHint}
					required={!hasExistingCredentials}
				/>

				<form.Field name='ssl'>
					{(field: { state: { value: boolean }; handleChange: (v: boolean) => void }) => (
						<div className='flex items-center justify-between rounded-md border border-border px-3 py-2'>
							<div className='grid gap-0.5'>
								<label htmlFor='smtp-ssl' className='text-sm font-medium text-foreground'>
									Use SSL
								</label>
								<p className='text-xs text-muted-foreground'>Enable TLS/SSL connection for SMTP.</p>
							</div>
							<Switch id='smtp-ssl' checked={field.state.value} onCheckedChange={field.handleChange} />
						</div>
					)}
				</form.Field>

				{error && <FormError error={error.message} />}

				<div className='flex justify-end gap-2 pt-2'>
					<Button variant='ghost' size='sm' type='button' onClick={onCancel}>
						Cancel
					</Button>
					<form.Subscribe selector={(state: { canSubmit: boolean }) => state.canSubmit}>
						{(canSubmit: boolean) => (
							<Button size='sm' type='submit' disabled={!canSubmit || isPending}>
								{isPending ? 'Saving...' : 'Save'}
							</Button>
						)}
					</form.Subscribe>
				</div>
			</form>
		</div>
	);
}
