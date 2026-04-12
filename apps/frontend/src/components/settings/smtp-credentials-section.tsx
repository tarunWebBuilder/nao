import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSmtpSettings } from '@/hooks/use-smtp-settings';

import { SmtpForm } from './smtp-form';

interface SmtpConfigSectionProps {
	isAdmin: boolean;
}

export function SmtpConfigSection({ isAdmin }: SmtpConfigSectionProps) {
	const { settings, usingDbOverride, editingState, updatePending, updateError, handleSubmit, handleCancel, handleEdit } =
		useSmtpSettings();

	const maskCredential = (value: string) => {
		if (!value) {
			return '';
		}
		if (value.length <= 8) {
			return '********';
		}
		return `${value.slice(0, 4)}****${value.slice(-4)}`;
	};

	if (!isAdmin) {
		return <p className='text-sm text-muted-foreground'>Contact your admin to update SMTP settings.</p>;
	}

	if (editingState?.isEditing) {
		return (
			<SmtpForm
				hasExistingCredentials={!!settings?.host}
				initialValues={{
					host: settings?.host ?? '',
					port: settings?.port ?? '587',
					mailFrom: settings?.mailFrom ?? '',
					ssl: settings?.ssl ?? false,
				}}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				isPending={updatePending}
				error={updateError}
			/>
		);
	}

	const badge = usingDbOverride ? 'DB' : 'ENV';

	return (
		<div className='p-4 rounded-lg border border-border bg-muted/30'>
			<div className='flex items-center gap-4'>
				<div className='flex-1 grid gap-1'>
					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium text-foreground'>SMTP</span>
						<span className='px-1.5 py-0.5 text-[10px] font-medium rounded bg-muted text-muted-foreground'>
							{badge}
						</span>
					</div>
					<div className='grid gap-0.5'>
						<span className='text-xs text-muted-foreground'>Host: {settings?.host || 'Not configured'}</span>
						{settings?.mailFrom && (
							<span className='text-xs text-muted-foreground'>Mail From: {settings.mailFrom}</span>
						)}
						{settings?.password && (
							<span className='text-xs font-mono text-muted-foreground'>
								Password: {maskCredential(settings.password)}
							</span>
						)}
						{settings?.port && <span className='text-xs text-muted-foreground'>Port: {settings.port}</span>}
						<span className='text-xs text-muted-foreground'>SSL: {settings?.ssl ? 'Enabled' : 'Disabled'}</span>
					</div>
				</div>
				<Button variant='ghost' size='icon-sm' onClick={handleEdit}>
					<Pencil className='size-3 text-muted-foreground' />
				</Button>
			</div>
		</div>
	);
}
