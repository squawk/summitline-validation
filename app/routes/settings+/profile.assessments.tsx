import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { Link, Outlet } from 'react-router'
import { Icon } from '#app/components/ui/icon.tsx'
import { type BreadcrumbHandle } from './profile.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="file-text">Assessments</Icon>,
	getSitemapEntries: () => null,
}

export default function AssessmentsRoute() {
	return <Outlet />
}