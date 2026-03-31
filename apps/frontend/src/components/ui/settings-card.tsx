import { cn } from '@/lib/utils';

export function SettingsPageWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className='overflow-auto flex-1'>
			<div className='mx-auto flex min-h-full w-full max-w-4xl flex-col gap-6 px-3 py-4 sm:px-4 sm:py-6 md:gap-12 md:p-8'>
				{children}
			</div>
		</div>
	);
}

interface SettingsCardProps {
	icon?: React.ReactNode;
	title?: string;
	titleSize?: 'md' | 'lg';
	description?: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	rootClassName?: string;
	className?: string;
	divide?: boolean;
}

export function SettingsCard({
	icon,
	title,
	titleSize = 'md',
	description,
	action,
	children,
	rootClassName,
	className,
	divide = false,
}: SettingsCardProps) {
	return (
		<div
			className={cn(
				'flex flex-col',
				titleSize === 'lg' && 'gap-5',
				titleSize === 'md' && 'gap-2.5',
				rootClassName,
			)}
		>
			{title && (
				<div className='flex flex-col gap-3 px-1 sm:px-4 md:flex-row md:items-center md:justify-between'>
					<div className='min-w-0 space-y-0'>
						<div className='flex items-center gap-2 px-0'>
							{icon && <div className='size-4 flex items-center justify-center shrink-0'>{icon}</div>}
							<div className='flex min-w-0 flex-1 items-center justify-between'>
								{title && (
									<div
										className={cn(
											'font-semibold text-foreground text-balance',
											titleSize === 'lg' && 'text-lg sm:text-xl',
											titleSize === 'md' && 'text-base',
										)}
									>
										{title}
									</div>
								)}
							</div>
						</div>
						{description && (
							<p
								className={cn(
									'text-muted-foreground text-balance',
									titleSize === 'lg' && 'text-sm',
									titleSize === 'md' && 'text-xs',
								)}
							>
								{description}
							</p>
						)}
					</div>
					{action && <div className='w-full md:ml-auto md:w-auto'>{action}</div>}
				</div>
			)}

			<div
				className={cn(
					'flex flex-col gap-4 rounded-xl border border-border bg-card p-3 sm:p-4',
					divide && 'gap-2 divide-y divide-border *:not-last:pb-2',
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
}
