import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { SettingsProjectNav } from '@/components/settings/project-nav';
import { trpc } from '@/main';
import { SettingsCard, SettingsPageWrapper } from '@/components/ui/settings-card';
import { Empty } from '@/components/ui/empty';

export const Route = createFileRoute('/_sidebar-layout/settings/project')({
	component: ProjectPage,
});

function ProjectPage() {
	const project = useQuery(trpc.project.getCurrent.queryOptions());

	return (
		<SettingsPageWrapper>
			<div className='flex flex-col gap-5'>
				<h1 className='text-base font-semibold text-foreground sm:text-lg'>Project Settings</h1>
				<div className='flex flex-col gap-4 md:flex-row md:gap-5'>
					<div className='flex w-full shrink-0 flex-col items-start gap-2 md:w-[20%] md:max-w-[132px] md:min-w-[72px]'>
						{project.data && <SettingsProjectNav />}
					</div>

					<div className='mb-4 flex min-w-0 flex-1 flex-col gap-6 sm:gap-8 md:gap-12'>
						{project.data ? (
							<Outlet />
						) : (
							<SettingsCard>
								<Empty>No project configured. Set NAO_DEFAULT_PROJECT_PATH environment variable.</Empty>
							</SettingsCard>
						)}
					</div>
				</div>
			</div>
		</SettingsPageWrapper>
	);
}
