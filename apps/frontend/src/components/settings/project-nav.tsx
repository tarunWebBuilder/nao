import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface NavItem {
	to: string;
	label: string;
}

const navItems: NavItem[] = [
	{ to: '/settings/project', label: 'Project' },
	{ to: '/settings/project/models', label: 'Models' },
	{ to: '/settings/project/agent', label: 'Agent' },
	{ to: '/settings/project/mcp-servers', label: 'MCP Servers' },
	{ to: '/settings/project/slack', label: 'Slack' },
	{ to: '/settings/project/teams', label: 'Microsoft Teams' },
	{ to: '/settings/project/telegram', label: 'Telegram' },
	{ to: '/settings/project/whatsapp', label: 'WhatsApp' },
	{ to: '/settings/project/team', label: 'Team' },
];

export function SettingsProjectNav() {
	return (
		<nav className='grid h-fit w-full min-w-0 grid-cols-2 gap-1 sm:grid-cols-3 md:sticky md:top-8 md:flex md:flex-col'>
			{navItems.map((item) => {
				return (
					<Link
						key={item.to}
						to={item.to}
						className={cn('w-full rounded-md px-2 py-1 text-left text-[11px] leading-tight transition-colors sm:px-2.5 sm:py-1.5 sm:text-xs')}
						activeOptions={{ exact: true }}
						activeProps={{
							className: cn('bg-accent font-medium text-foreground'),
						}}
						inactiveProps={{
							className: cn('text-muted-foreground hover:bg-accent/50 hover:text-foreground'),
						}}
					>
						<span className='block text-balance md:truncate'>{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
